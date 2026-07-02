
        // Generate stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 200;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = Math.random() * 3 + 'px';
                star.style.height = star.style.width;
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Generate code function
        async function generateCode() {
            const urlInput = document.getElementById('urlInput');
            const url = urlInput.value.trim();
            
            if (!url) {
                alert('Masukkan URL terlebih dahulu!');
                return;
            }
            
            if (!url.startsWith('https://')) {
                alert('URL wajib menggunakan https://');
                return;
            }
            
            const loading = document.getElementById('loading');
            const resultSection = document.getElementById('resultSection');
            
            loading.classList.add('active');
            resultSection.classList.remove('active');
            
            try {
                const response = await fetch(`https://api.resellergaming.my.id/tools/getcode?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                
                if (data.status) {
                    document.getElementById('creator').textContent = `Creator: ${data.creator}`;
                    document.getElementById('status').textContent = `Status: ${data.status ? 'Success' : 'Failed'}`;
                    document.getElementById('codeOutput').textContent = data.result.html;
                    
                    loading.classList.remove('active');
                    resultSection.classList.add('active');
                } else {
                    throw new Error('Failed to fetch code');
                }
            } catch (error) {
                loading.classList.remove('active');
                alert('Terjadi kesalahan saat mengambil kode. Silakan coba lagi.');
                console.error('Error:', error);
            }
        }

        // Copy code function
        function copyCode() {
            const codeOutput = document.getElementById('codeOutput');
            const copyButton = document.querySelector('.copy-button');
            
            navigator.clipboard.writeText(codeOutput.textContent).then(() => {
                copyButton.textContent = 'Tersalin!';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.textContent = 'Salin Kode';
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Gagal menyalin kode');
            });
        }

        // Initialize
        createStars();
    

// TODO: Tambahkan fitur salin per 50 baris di versi berikutnya.
