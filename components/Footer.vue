<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-left">
          <NuxtLink to="/" class="footer-logo">
            <img src="/images/wave-logo.svg" alt="AquaDreams" class="logo-image">
          </NuxtLink>
        </div>
        
        <div class="footer-center">
          <div class="contact-item">
            <img src="/images/geo.svg" alt="Адрес" class="contact-icon">
            <div class="contact-text">
              <p>Г. РОСТОВ-НА-ДОНУ</p>
              <p>УЛ. МАЛИНОВСКОГО 90/7</p>
              <p>ОФИС 6, ЭТАЖ 1</p>
            </div>
          </div>
          
          <div class="contact-group">
            <a href="tel:+79897089625" class="contact-item">
              <img src="/images/phone.svg" alt="Телефон" class="contact-icon">
              <span class="contact-text">+7 (989) 708-96-25</span>
            </a>
            
            <a href="mailto:info@aquadreams.ru" class="contact-item">
              <img src="/images/email.svg" alt="Email" class="contact-icon">
              <span class="contact-text">info@aquadreams.ru</span>
            </a>
          </div>
        </div>
        
        <div class="footer-right">
          <div class="social-links">
            <a href="#" class="social-link">
              <img src="/images/telegram.svg" alt="Telegram" class="social-icon">
            </a>
            <a href="#" class="social-link">
              <img src="/images/whatsapp.svg" alt="WhatsApp" class="social-icon">
            </a>
            <a href="#" class="social-link">
              <img src="/images/instagram.svg" alt="Instagram" class="social-icon">
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1E1E1E;
  padding: 30px 0;
  color: #fff;
  margin-top: 100px;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.footer-left {
  flex-shrink: 0;
}

.logo-image {
  height: 60px;
  width: auto;
}

.footer-center {
  display: flex;
  align-items: center;
  gap: 60px;
}

.contact-group {
  display: flex;
  align-items: center;
  gap: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fff;
  white-space: nowrap;
}

.contact-item .contact-text {
  color: #fff;
}

.contact-group .contact-item .contact-text {
  color: #23A3FF;
}

.contact-icon {
  width: 34px;
  height: 34px;
}

.contact-item:first-child .contact-icon {
  width: 27px;
  height: 49px;
}

.contact-text {
  font-size: 14px;
  line-height: 1.4;
}

.contact-text p {
  margin: 0;
  text-transform: uppercase;
}

.footer-right {
  flex-shrink: 0;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.social-icon {
  width: 40px;
  height: 40px;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-icon {
  opacity: 0.8;
}

.contact-group .contact-icon {
  color: #23A3FF;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}

.copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin: 0;
}

@media (max-width: 1200px) {
  .footer-content {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    text-align: center;
  }

  .footer-center {
    flex-direction: column;
    gap: 30px;
  }

  .contact-group {
    flex-direction: column;
    gap: 15px;
  }
}
</style> 