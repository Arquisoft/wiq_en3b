import React from 'react'
import Lottie from 'react-lottie'
import errorAnimationData from './error.json'
import './PageNotFound.css'
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="content">
        <h1>{t('error_page.title')}</h1>
        <p>{t('error_page.description')}</p>
        <div className="animation" data-testid="animation-container">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
