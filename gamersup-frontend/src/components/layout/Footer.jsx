import React from 'react'

function Footer() {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer p-5 text-base bg-base-200 text-primary-content footer-center'>
      <div>
        <p>&copy; {footerYear} Gamers Up, by <strong><a href="https://github.com/ariayingdeng">Ying Deng</a></strong> & <strong><a href="https://github.com/TungYuChen">Tung Yu Chen</a></strong></p> 
        
      </div>
    </footer>
  )
}

export default Footer
