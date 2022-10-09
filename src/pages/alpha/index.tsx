import Layout from '@components/alpha/Layout'

const Index = () => {
  return (
    <div className="text-3xl font-black m-auto tracking-tighter uppercase opacity-10 animate-pulse">
      Put your content here
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Index
