import React, { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext()

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}

export const PortfolioProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([])
  const [videos, setVideos] = useState([])
  const [siteConfig, setSiteConfig] = useState({
    title: '我的个人作品集',
    subtitle: '创意无限，艺术永恒',
    description: '欢迎来到我的创意世界，这里展示了我的绘画作品和视频创作。每一件作品都承载着我的思考和情感，希望能与您产生共鸣。',
    heroImage: null,
    socialLinks: {
      email: 'your.email@example.com',
      instagram: '',
      twitter: '',
      youtube: ''
    },
    theme: {
      primaryColor: '#0ea5e9',
      accentColor: '#8b5cf6'
    }
  })

  // 从本地存储加载数据
  useEffect(() => {
    const savedArtworks = localStorage.getItem('portfolio_artworks')
    const savedVideos = localStorage.getItem('portfolio_videos')
    const savedConfig = localStorage.getItem('portfolio_config')

    if (savedArtworks) {
      try {
        setArtworks(JSON.parse(savedArtworks))
      } catch (error) {
        console.error('Error loading artworks:', error)
      }
    } else {
      // 默认示例数据
      const defaultArtworks = [
        {
          id: 1,
          title: '抽象风景',
          description: '这是一幅表现内心情感的抽象风景画，运用了丰富的色彩和流动的线条。',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
          category: '绘画',
          date: '2024-01-15',
          tags: ['抽象', '风景', '色彩']
        },
        {
          id: 2,
          title: '城市印象',
          description: '现代都市生活的写照，捕捉了城市的节奏和活力。',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          category: '绘画',
          date: '2024-01-10',
          tags: ['城市', '现代', '生活']
        },
        {
          id: 3,
          title: '自然之美',
          description: '大自然的宁静与美丽，用细腻的笔触表现了自然的和谐。',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          category: '绘画',
          date: '2024-01-05',
          tags: ['自然', '宁静', '和谐']
        }
      ]
      setArtworks(defaultArtworks)
    }

    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos))
      } catch (error) {
        console.error('Error loading videos:', error)
      }
    } else {
      // 默认示例视频数据
      const defaultVideos = [
        {
          id: 1,
          title: '创作过程记录',
          description: '记录了一幅画作从构思到完成的全过程，展现了艺术创作的魅力。',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop',
          duration: '5:30',
          date: '2024-01-20',
          tags: ['创作', '过程', '绘画']
        },
        {
          id: 2,
          title: '艺术技法分享',
          description: '分享一些实用的绘画技法和心得体会。',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop',
          duration: '8:15',
          date: '2024-01-18',
          tags: ['技法', '教程', '分享']
        }
      ]
      setVideos(defaultVideos)
    }

    if (savedConfig) {
      try {
        setSiteConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }))
      } catch (error) {
        console.error('Error loading config:', error)
      }
    }
  }, [])

  // 保存数据到本地存储
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to storage:', error)
    }
  }

  // 添加艺术作品
  const addArtwork = (artwork) => {
    const newArtwork = {
      ...artwork,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    const updatedArtworks = [...artworks, newArtwork]
    setArtworks(updatedArtworks)
    saveToStorage('portfolio_artworks', updatedArtworks)
  }

  // 删除艺术作品
  const deleteArtwork = (id) => {
    const updatedArtworks = artworks.filter(artwork => artwork.id !== id)
    setArtworks(updatedArtworks)
    saveToStorage('portfolio_artworks', updatedArtworks)
  }

  // 更新艺术作品
  const updateArtwork = (id, updatedData) => {
    const updatedArtworks = artworks.map(artwork => 
      artwork.id === id ? { ...artwork, ...updatedData } : artwork
    )
    setArtworks(updatedArtworks)
    saveToStorage('portfolio_artworks', updatedArtworks)
  }

  // 添加视频
  const addVideo = (video) => {
    const newVideo = {
      ...video,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    const updatedVideos = [...videos, newVideo]
    setVideos(updatedVideos)
    saveToStorage('portfolio_videos', updatedVideos)
  }

  // 删除视频
  const deleteVideo = (id) => {
    const updatedVideos = videos.filter(video => video.id !== id)
    setVideos(updatedVideos)
    saveToStorage('portfolio_videos', updatedVideos)
  }

  // 更新视频
  const updateVideo = (id, updatedData) => {
    const updatedVideos = videos.map(video => 
      video.id === id ? { ...video, ...updatedData } : video
    )
    setVideos(updatedVideos)
    saveToStorage('portfolio_videos', updatedVideos)
  }

  // 更新网站配置
  const updateSiteConfig = (newConfig) => {
    const updatedConfig = { ...siteConfig, ...newConfig }
    setSiteConfig(updatedConfig)
    saveToStorage('portfolio_config', updatedConfig)
  }

  const value = {
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
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}