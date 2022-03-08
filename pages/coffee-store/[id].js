import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import coffeeStoreData from '../../data/coffee-stores.json'

import styles from '../../styles/coffee-store.module.css'

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

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	const { address, name, neighbourhood, imgUrl } = props.coffeeStore

	return (
		<div className={styles.layout}>
			<Head>{name}</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>
							<a>Back to home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						src={imgUrl}
						width={600}
						height={360}
						className={styles.storeImg}
						alt={name}
					></Image>
				</div>
				<div className={styles.col2}>
					<p>{address}</p>
					<p>{neighbourhood}</p>
				</div>
			</div>
		</div>
	)
}

export default CoffeeStore
