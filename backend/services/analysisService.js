const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const TestResult = require('../models/TestResult');

/**
 * KAMUS DATA ENNEAGRAM
 * Digunakan untuk menerjemahkan hasil prediksi AI (Cuma Tipe) menjadi deskripsi lengkap.
 */
const ENNEAGRAM_DETAILS = {
    'Tipe 1': {
        traits: ['Perfeksionis', 'Etis', 'Terorganisir', 'Disiplin'],
        desc: 'Anda memiliki standar tinggi, idealis, dan ingin segala sesuatu berjalan benar.'
    },
    'Tipe 2': {
        traits: ['Penolong', 'Empatik', 'Murah Hati', 'Perhatian'],
        desc: 'Anda sangat peduli pada orang lain dan ingin merasa dibutuhkan.'
    },
    'Tipe 3': {
        traits: ['Ambisius', 'Adaptif', 'Berorientasi Sukses', 'Fokus'],
        desc: 'Anda energik dan termotivasi untuk mencapai kesuksesan dan pengakuan.'
    },
    'Tipe 4': {
        traits: ['Romantis', 'Kreatif', 'Unik', 'Sensitif'],
        desc: 'Anda ekspresif secara emosional dan menghargai keindahan serta keunikan diri.'
    },
    'Tipe 5': {
        traits: ['Analitis', 'Observan', 'Mandiri', 'Logis'],
        desc: 'Anda suka mengumpulkan pengetahuan dan cenderung menjaga privasi.'
    },
    'Tipe 6': {
        traits: ['Loyal', 'Bertanggung Jawab', 'Waspada', 'Komitmen'],
        desc: 'Anda menghargai keamanan, setia pada kelompok, dan selalu antisipatif.'
    },
    'Tipe 7': {
        traits: ['Antusias', 'Spontan', 'Optimis', 'Produktif'],
        desc: 'Anda menyukai pengalaman baru, petualangan, dan menghindari kebosanan.'
    },
    'Tipe 8': {
        traits: ['Tegas', 'Percaya Diri', 'Dominan', 'Pelindung'],
        desc: 'Anda adalah pemimpin alami yang tidak takut menyuarakan kebenaran.'
    },
    'Tipe 9': {
        traits: ['Damai', 'Tenang', 'Suportif', 'Toleran'],
        desc: 'Anda menghindari konflik dan berusaha menjaga harmoni di lingkungan Anda.'
    }
};

/**
 * Service to handle handwriting analysis logic
 */
const analysisService = {

    // --- LOGIKA REAL AI (CONNECT KE PYTHON) ---
    analyze: async (imagePath) => {
        console.log(`[Service] Memulai analisis AI untuk file: ${imagePath}`);

        try {
            // 1. Siapkan Data Gambar
            const form = new FormData();
            form.append('file', fs.createReadStream(imagePath));

            // 2. Ambil URL dari .env
            const aiUrl = process.env.FLASK_AI_URL;
            if (!aiUrl) throw new Error("FLASK_AI_URL belum disetting di .env!");

            // 3. Tembak ke API Python
            console.log(`[Service] Menghubungi Server AI di: ${aiUrl} ...`);
            const response = await axios.post(aiUrl, form, {
                headers: {
                    ...form.getHeaders() // Header penting untuk upload file
                }
            });

            // 4. Ambil Data dari Python
            // Python balikin JSON: { status: 'success', data: { prediction: 'Tipe X ...', ... } }
            const aiData = response.data.data; // Adjusted based on user comment structure

            // Fallback logic incase structure is slightly different (e.g. direct response)
            // But trusting user's structure: response.data.data.prediction
            const rawPrediction = aiData ? aiData.prediction : (response.data.prediction || "Unknown");

            console.log(`[Service] Hasil AI Diterima: ${rawPrediction}`);

            // 5. Mapping Hasil AI ke Format Frontend
            // Kita ambil kata kuncinya saja, misal "Tipe 2" dari string "Tipe 2 (Penolong)"
            // Robust parsing:
            let cleanType = 'Unknown';
            if (rawPrediction) {
                cleanType = rawPrediction.split('(')[0].trim(); // Ambil "Tipe X"
            }

            // Cari detail di Kamus Data kita
            const details = ENNEAGRAM_DETAILS[cleanType] || {
                traits: ['Unknown'],
                desc: 'Tipe kepribadian terdeteksi, namun detail belum tersedia.'
            };

            // 6. Return Format Final (Sesuai yg diminta Frontend/Database kamu)
            return {
                personalityType: rawPrediction || "Unknown Type", // "Tipe 2 (Penolong)"
                traits: details.traits,
                confidence: (aiData && aiData.raw_confidence) ? aiData.raw_confidence : 0.85, // Pakai data confidence dr AI
                details: {
                    features: {
                        // Karena kita pakai Deep Learning, fitur manual (slant/pressure) 
                        // tidak diukur secara eksplisit. Kita kasih info generic aja.
                        method: "Deep Learning (CNN)",
                        preprocessing: "Histogram Equalization (HE)",
                        note: "Analisis dilakukan berdasarkan ekstraksi fitur otomatis (Auto-feature extraction)."
                    },
                    description: details.desc
                }
            };

        } catch (error) {
            console.error("[Service Error] Gagal connect ke AI Python:", error.message);

            // Opsional: Kalau AI mati, mau error atau fallback ke mock?
            // Disini kita throw error biar ketahuan kalau AI-nya mati
            if (error.code === 'ECONNREFUSED') {
                throw new Error("Server AI tidak aktif. Pastikan laptop Aisyah sudah menjalankan app.py!");
            }
            throw new Error("Gagal memproses analisis grafologi: " + error.message);
        }
    },

    // Save result to Database
    saveResult: async (userId, imagePath, analysisData) => {
        try {
            const result = await TestResult.create({
                user: userId,
                imagePath: imagePath,
                status: 'completed',
                results: {
                    ...analysisData,
                    analysisDate: new Date()
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Database Error: ${error.message}`);
        }
    }
};

module.exports = analysisService;
