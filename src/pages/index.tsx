import { GetStaticPropsContext } from 'next'

import Layout from '@components/Layout'

export default function Index () {
  return <></>
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

Index.messages = ['Index', ...Layout.messages]

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: (await import(`../assets/json/locales/${locale}.json`)).default
  }
})
