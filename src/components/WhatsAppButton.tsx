
import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  message?: string
  className?: string
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  message = "Hello! I'm interested in learning more about your Islamic education courses.",
  className = ""
}) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+1234567890' // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg ${className}`}
      title="Contact us on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>WhatsApp Inquiry</span>
    </button>
  )
}

export default WhatsAppButton
