import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'zdec6055',
  dataset: 'production',
  apiVersion: '1',
  useCdn: false,
  token: process.env.NEXT_APP_SANITY_CLIENT_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)