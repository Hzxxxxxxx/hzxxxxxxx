import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import ListItem from '../components/ListItem'
import { ListGroup as OriginalListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'

// Fetch static props
export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('the-two-types-of-quality', featuredParams),
    getPostBySlug('how-is-life-post-yc', featuredParams),
  ]

  return {
    props: {
      title: 'Research // Zixiang He',
      tagline: 'Design. Innovate. Inspire.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

// Define custom image styles
const StyledImage = styled('img', {
  width: '100%', // Set image to take full width of its container
  maxWidth: '500px', // Maximum width for larger screens
  height: 'auto', // Maintain aspect ratio
  objectFit: 'cover', // Cover the container to avoid distortion
  marginTop: '20px', // Adjust margin-top to increase space between text and image
})

// Define custom container styles for FeaturedArticle
const FeaturedArticleContainer = styled('div', {
  marginBottom: '40px', // Add margin-bottom to create space between articles
})

// FeaturedArticle component definition
const FeaturedArticle = ({ title, description, image, stats, content }) => {
  return (
    <FeaturedArticleContainer>
      <h3>{title}</h3>
      
      {image} {/* Ensure the image is rendered */}

      <p>{description}</p>
      {/* Render other content like stats if needed */}
    </FeaturedArticleContainer>
  )
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={<StyledImage src={post.image || 'https://via.placeholder.com/300'} alt={post.title} />}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `Here you can find all the articles I have written. This collection showcases my work on various topics, reflecting my research interests and insights in the field of robotics.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://Hzxxxxxxx.com/articles" property="og:url" />
        <meta content={`https://Hzxxxxxxx.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Articles</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>
      </AnimateSharedLayout>
    </>
  )
}

// Adjust FeaturedArticles styles to increase bottom margin
const FeaturedArticles = styled('div', {
  margin: '10px 25px 0px -10px', // Add margin-bottom to create space below FeaturedArticles
  '@bp2': { display: 'block' }, // Responsive display styles
})

// Wrap the imported ListGroup component to add spacing
const StyledListGroup = styled(OriginalListGroup, {
  marginTop: '80px',
  marginBottom: '80px',
  // Add margin-top to create space above All Articles section
})

Articles.Layout = Base

export default Articles
