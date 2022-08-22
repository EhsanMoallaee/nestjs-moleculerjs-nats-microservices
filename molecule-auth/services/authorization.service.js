"use strict";
const verifyJwt = require('../helperFunctions/verify.jwt');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "authorization",

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
		verifyToken: {
			rest: {
				method: "POST",
				path: "/verifyToken"
			},
			/** @param {Context} ctx  */
			/** @param {IncomingRequest} req  */
			async handler(ctx , req) {
				const response = await verifyJwt(ctx.params);
				const payload = {
					_id: response.user._id,
					email: response.user.email,
					fullname: response.user.fullname,
					role: response.user.role
				}
				if(response.result === 'Authenticated') {
					const result = await ctx.call('auth.login', payload);
					return {message: response.result , token: result, payload}
				}else if(response.result === 'Authentication failed') {
					return {message: response.result, token: '', payload}
				}
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
