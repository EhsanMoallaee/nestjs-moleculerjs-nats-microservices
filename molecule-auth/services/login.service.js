"use strict";
const generateJwt = require('../helperFunctions/generate.jwt');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "auth",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		login: {
			rest: {
				method: "POST",
				path: "/login"
			},
			/** @param {Context} ctx  */
			/** @param {IncomingRequest} req  */
			async handler(ctx , req) {
				const response = generateJwt(ctx.params);
				return response;

				// await ctx.call('user_logged_in_moleculerjs', {email:'molecule@mail'});
				// await ctx.broker.call('user_logged_in_moleculerjs', {email:'molecule@mail'});
				// await ctx.emit('user_registered', {email:'molecul@mail'});
				// const res = await broker.call('user_registered', ctx.params);
				// return this.Promise.resolve(ctx.params);
				// console.log(ctx);
				// res.send('response')
				// return {re: 'response'};
			}
		},
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
