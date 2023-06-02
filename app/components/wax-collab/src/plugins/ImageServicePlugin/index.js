/* This is a reworking of https://gitlab.coko.foundation/wax/wax-prosemirror/-/tree/master/wax-prosemirror-services/src/ImageService 
It was reworked to use the current version of Wax. If this is imported, it replaces the default Wax version of ImageService */

import ImageService from './ImageService/ImageService'

// There is no toolgroup in this plugin!

export { ImageService }

// TODO: Need to import this to other editors that use ImageService (just FullWaxEditor?)
