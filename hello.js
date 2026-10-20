document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnText = btnLogin.querySelector('.btn-text');
    const btnIcon = btnLogin.querySelector('.btn-icon');
    const loginSpinner = document.getElementById('loginSpinner');
    
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // 1. Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        const icon = togglePasswordBtn.querySelector('i');
        icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });

    // 2. Real-time Input Validation Reset
    usernameInput.addEventListener('input', () => {
        usernameError.textContent = '';
        usernameInput.style.borderColor = '';
        hideAlert();
    });

    passwordInput.addEventListener('input', () => {
        passwordError.textContent = '';
        passwordInput.style.borderColor = '';
        hideAlert();
    });

    // 3. Form Submission Handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Reset state
        usernameError.textContent = '';
        passwordError.textContent = '';
        hideAlert();

        // Validate Username/NIP
        if (!username) {
            showInputError(usernameInput, usernameError, 'NIP / Username tidak boleh kosong');
            isValid = false;
        } else if (username.length < 5) {
            showInputError(usernameInput, usernameError, 'Format NIP / Username terlalu pendek');
            isValid = false;
        }

        // Validate Password
        if (!password) {
            showInputError(passwordInput, passwordError, 'Kata sandi tidak boleh kosong');
            isValid = false;
        } else if (password.length < 6) {
            showInputError(passwordInput, passwordError, 'Kata sandi minimal 6 karakter');
            isValid = false;
        }

        if (!isValid) return;

        // Simulate Loading & Login Logic
        setLoadingState(true);

        setTimeout(() => {
            setLoadingState(false);

            // Dummy Credentials for Demonstration
            // Username: 199501012020121001 / Password: admin
            if ((username === '199501012020121001' || username === 'admin') && password === 'admin123') {
                showAlert('Login Berhasil! Mengalihkan ke dashboard...', 'success');
                setTimeout(() => {
                    alert('Redirecting ke Portal Layanan Kepegawaian Cabdin Banyuwangi...');
                    // window.location.href = '/dashboard';
                }, 1000);
            } else {
                showAlert('NIP / Username atau Kata Sandi yang Anda masukkan salah.', 'error');
                showInputError(usernameInput, null, '');
                showInputError(passwordInput, null, '');
            }
        }, 1500);
    });

    // Helper: Show Error Input Border & Message
    function showInputError(inputElement, errorElement, message) {
        inputElement.style.borderColor = 'var(--danger)';
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Helper: Show Alert Message
    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertBox.className = `alert ${type}`;
        
        if (type === 'error') {
            alertIcon.className = 'fa-solid fa-circle-exclamation';
        } else {
            alertIcon.className = 'fa-solid fa-circle-check';
        }
    }

    // Helper: Hide Alert Box
    function hideAlert() {
        alertBox.className = 'alert hidden';
    }

    // Helper: Loading Button State
    function setLoadingState(isLoading) {
        if (isLoading) {
            btnLogin.disabled = true;
            btnText.textContent = 'Memproses...';
            btnIcon.classList.add('hidden');
            loginSpinner.classList.remove('hidden');
        } else {
            btnLogin.disabled = false;
            btnText.textContent = 'Masuk ke Portal';
            btnIcon.classList.remove('hidden');
            loginSpinner.classList.add('hidden');
        }
    }
});

// 4. Handle Forgot Password Handler
function handleForgotPassword(event) {
    event.preventDefault();
    alert('Untuk permohonan reset password, silakan hubungi Tim Admin Subag TU Cabang Dinas Pendidikan Wilayah Kabupaten Banyuwangi.');
}