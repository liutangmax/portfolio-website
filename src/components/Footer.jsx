import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, Instagram, Twitter, Youtube, Palette } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

const Footer = () => {
  const { siteConfig } = usePortfolio()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${siteConfig.socialLinks.email}`,
      color: 'hover:text-red-500'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: siteConfig.socialLinks.instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: siteConfig.socialLinks.twitter,
      color: 'hover:text-blue-500'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: siteConfig.socialLinks.youtube,
      color: 'hover:text-red-600'
    }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
              >
                <Palette className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-display font-bold text-gradient">
                {siteConfig.title}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-gray-100">
              快速链接
            </h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                首页
              </a>
              <a href="/gallery" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                绘画作品
              </a>
              <a href="/videos" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                视频作品
              </a>
              <a href="/admin" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                管理后台
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-gray-100">
              联系我
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                if (!social.url || (social.name !== 'Email' && !social.url.startsWith('http'))) {
                  return null
                }
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.name === 'Email' ? '_self' : '_blank'}
                    rel={social.name === 'Email' ? '' : 'noopener noreferrer'}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white dark:bg-dark-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 dark:text-gray-400 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              欢迎通过以上方式与我联系交流
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>© {currentYear} {siteConfig.title}. 保留所有权利.</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>用</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>制作</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer