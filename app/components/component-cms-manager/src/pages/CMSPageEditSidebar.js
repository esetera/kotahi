import React from 'react'

const CMSPageEditSidebar = ({ cmsPages, currentCMSPage }) => {
  return (
    <div style={{ background: 'red', height: '100%' }}>
      {cmsPages.map(cmsPage => (
        <div
          key={cmsPage.id}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p>{cmsPage.title}</p>
          <p>{cmsPage.id === currentCMSPage.id ? '>' : ''}</p>
        </div>
      ))}
    </div>
  )
}

export default CMSPageEditSidebar
