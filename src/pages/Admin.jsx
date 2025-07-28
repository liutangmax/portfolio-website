import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Image, 
  Video, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Eye,
  EyeOff,
  Palette,
  Globe
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { usePortfolio } from '../context/PortfolioContext'

const Admin = () => {
  const { 
    artworks, 
    videos, 
    siteConfig, 
    addArtwork, 
    deleteArtwork, 
    updateArtwork,
    addVideo, 
    deleteVideo, 
    updateVideo,
    updateSiteConfig 
  } = usePortfolio()
  
  const [activeTab, setActiveTab] = useState('artworks')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadType, setUploadType] = useState('artwork')
  const [editingItem, setEditingItem] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  // 简单的密码验证（实际项目中应该使用更安全的方式）
  const ADMIN_PASSWORD = 'admin123'
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    image: null,
    url: '',
    duration: '',
    thumbnail: null
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('密码错误')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  // 文件上传处理
  const onDrop = (acceptedFiles, field) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'image'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  })

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps, isDragActive: isThumbnailDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'thumbnail'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (uploadType === 'artwork') {
      const artworkData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: formData.image
      }
      
      if (editingItem) {
        updateArtwork(editingItem.id, artworkData)
      } else {
        addArtwork(artworkData)
      }
    } else {
      const videoData = {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        duration: formData.duration,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        thumbnail: formData.thumbnail
      }
      
      if (editingItem) {
        updateVideo(editingItem.id, videoData)
      } else {
        addVideo(videoData)
      }
    }
    
    resetForm()
    setShowUploadModal(false)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      image: null,
      url: '',
      duration: '',
      thumbnail: null
    })
    setEditingItem(null)
  }

  const handleEdit = (item, type) => {
    setEditingItem(item)
    setUploadType(type)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category || '',
      tags: item.tags ? item.tags.join(', ') : '',
      image: item.image || null,
      url: item.url || '',
      duration: item.duration || '',
      thumbnail: item.thumbnail || null
    })
    setShowUploadModal(true)
  }

  const handleDelete = (id, type) => {
    if (window.confirm('确定要删除这个项目吗？')) {
      if (type === 'artwork') {
        deleteArtwork(id)
      } else {
        deleteVideo(id)
      }
    }
  }

  const handleSiteConfigUpdate = (field, value) => {
    updateSiteConfig({ [field]: value })
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              管理员登录
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              请输入管理员密码以访问后台
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入管理员密码"
                className="input-field pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              登录
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>演示密码:</strong> admin123
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'artworks', label: '绘画管理', icon: Image },
    { id: 'videos', label: '视频管理', icon: Video },
    { id: 'settings', label: '网站设置', icon: Settings }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 min-h-screen bg-gray-50 dark:bg-dark-900"
    >
      {/* Header */}
      <section className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
                管理后台
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                管理您的作品集内容和网站设置
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              退出登录
            </button>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 dark:bg-dark-700 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'artworks' && (
            <motion.div
              key="artworks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  绘画作品管理 ({artworks.length})
                </h2>
                <button
                  onClick={() => {
                    setUploadType('artwork')
                    setShowUploadModal(true)
                    resetForm()
                  }}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  添加作品
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="card overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {artwork.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">
                          {artwork.category}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(artwork, 'artwork')}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(artwork.id, 'artwork')}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  视频作品管理 ({videos.length})
                </h2>
                <button
                  onClick={() => {
                    setUploadType('video')
                    setShowUploadModal(true)
                    resetForm()
                  }}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  添加视频
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="card overflow-hidden">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">
                          {video.duration}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(video, 'video')}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(video.id, 'video')}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  网站基本信息
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      网站标题
                    </label>
                    <input
                      type="text"
                      value={siteConfig.title}
                      onChange={(e) => handleSiteConfigUpdate('title', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      副标题
                    </label>
                    <input
                      type="text"
                      value={siteConfig.subtitle}
                      onChange={(e) => handleSiteConfigUpdate('subtitle', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      网站描述
                    </label>
                    <textarea
                      value={siteConfig.description}
                      onChange={(e) => handleSiteConfigUpdate('description', e.target.value)}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  社交链接
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={siteConfig.socialLinks.email}
                      onChange={(e) => handleSiteConfigUpdate('socialLinks', {
                        ...siteConfig.socialLinks,
                        email: e.target.value
                      })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={siteConfig.socialLinks.instagram}
                      onChange={(e) => handleSiteConfigUpdate('socialLinks', {
                        ...siteConfig.socialLinks,
                        instagram: e.target.value
                      })}
                      className="input-field"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={siteConfig.socialLinks.twitter}
                      onChange={(e) => handleSiteConfigUpdate('socialLinks', {
                        ...siteConfig.socialLinks,
                        twitter: e.target.value
                      })}
                      className="input-field"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={siteConfig.socialLinks.youtube}
                      onChange={(e) => handleSiteConfigUpdate('socialLinks', {
                        ...siteConfig.socialLinks,
                        youtube: e.target.value
                      })}
                      className="input-field"
                      placeholder="https://youtube.com/channel/..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-dark-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {editingItem ? '编辑' : '添加'}{uploadType === 'artwork' ? '绘画作品' : '视频作品'}
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      标题 *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      描述 *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="input-field"
                      required
                    />
                  </div>

                  {uploadType === 'artwork' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          分类
                        </label>
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="input-field"
                          placeholder="例如：绘画、插画、素描等"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          作品图片 *
                        </label>
                        <div
                          {...getImageRootProps()}
                          className={`upload-zone ${isImageDragActive ? 'active' : ''}`}
                        >
                          <input {...getImageInputProps()} />
                          {formData.image ? (
                            <div className="text-center">
                              <img
                                src={formData.image}
                                alt="预览"
                                className="w-32 h-32 object-cover rounded mx-auto mb-2"
                              />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                点击或拖拽更换图片
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 dark:text-gray-400">
                                {isImageDragActive ? '放下图片文件' : '点击或拖拽上传图片'}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                支持 JPG、PNG、GIF、WebP 格式
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {uploadType === 'video' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          视频链接 *
                        </label>
                        <input
                          type="url"
                          value={formData.url}
                          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                          className="input-field"
                          placeholder="https://youtube.com/watch?v=..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          视频时长
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                          className="input-field"
                          placeholder="例如：5:30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          视频缩略图
                        </label>
                        <div
                          {...getThumbnailRootProps()}
                          className={`upload-zone ${isThumbnailDragActive ? 'active' : ''}`}
                        >
                          <input {...getThumbnailInputProps()} />
                          {formData.thumbnail ? (
                            <div className="text-center">
                              <img
                                src={formData.thumbnail}
                                alt="缩略图预览"
                                className="w-32 h-20 object-cover rounded mx-auto mb-2"
                              />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                点击或拖拽更换缩略图
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 dark:text-gray-400">
                                {isThumbnailDragActive ? '放下缩略图文件' : '点击或拖拽上传缩略图'}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                支持 JPG、PNG、GIF、WebP 格式
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      标签
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      className="input-field"
                      placeholder="用逗号分隔，例如：抽象,色彩,创意"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="btn-secondary flex-1"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {editingItem ? '更新' : '保存'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Admin