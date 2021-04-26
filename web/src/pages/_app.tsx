import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import theme from '../theme';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	LoginMutation,
	LogoutMutation,
	MeDocument,
	MeQuery,
	RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from '../utils/betterUpdateQuery';
import { AnyMxRecord } from 'node:dns';

function MyApp({ Component, pageProps }: any) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
