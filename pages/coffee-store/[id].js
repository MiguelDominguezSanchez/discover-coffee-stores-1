import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import coffeeStoreData from '../../data/coffee-stores.json'

export function getStaticProps(staticProps) {
	const params = staticProps.params
	console.log('params', params)
	return {
		props: {
			coffeeStore: coffeeStoreData.find((coffeeStore) => {
				return coffeeStore.id.toString() === params.id // dynamic id
			}),
		},
	}
}

export function getStaticPaths() {
	const paths = coffeeStoreData.map((coffeeStore) => {
		return {
			params: {
				id: coffeeStore.id.toString(),
			},
		}
	})
	return {
		paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
		fallback: true,
	}
}

const CoffeeStore = (props) => {
	const router = useRouter()
	console.log('router', router)

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	const { address, name, neighbourhood } = props.coffeeStore

	console.log('props', props)
	return (
		<div>
			<Head>{name}</Head>
			<Link href='/'>
				<a>Back to home</a>
			</Link>

			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</div>
	)
}

export default CoffeeStore
