import { gql } from '@apollo/client'

const cmsPageFields = `
    id
    content
    created
    meta
    shortcode
    status
    title
    updated
`

export const getCMSPages = gql`
  query cmsPages {
    cmsPages {
      ${cmsPageFields}
    }
  }
`

export const getCMSPage = gql`
  query cmsPages($id: ID) {
    cmsPages(id: $id) {
      ${cmsPageFields}
    }
  }
`

export const getCMSPageByShortcode = gql`
  query cmsPageByShortcode($shortcode: String!) {
    cmsPageByShortcode(shortcode: $shortcode) {
      ${cmsPageFields}
    }
  }
`

export const updateCMSPageDataMutation = gql`
  mutation updateFlaxPage($id: ID, $input: FlaxPageInput) {
    updateFlaxPage(id: $id, input: $input) {
        ${cmsPageFields}
    }
  }
`

export const rebuildFlaxSiteMutation = gql`
  mutation rebuildFlaxSite {
    rebuildFlaxSite {
      status
      error
    }
  }
`
