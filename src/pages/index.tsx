import { GetStaticPropsContext } from 'next'

import Layout from '@components/Layout'

export default function Index () {
  return (
    <div className="text-3xl font-black m-auto tracking-tighter uppercase opacity-10 animate-pulse">
      Put your content here
    </div>
  )
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
