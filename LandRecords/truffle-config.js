module.exports = {
	contracts_build_directory: "../LandRecordsManagement/src/contract",

	networks: {
		loc_development_development: {
			network_id: "*",
			port: 8545,
			host: "127.0.0.1",
			database: {
				dbPath: "file:./ganache_db",
			},
		},
	},
	mocha: {},
	compilers: {
		solc: {
			version: "0.8.18",
			optimizer: {
				enabled: true,
				runs: 500,
			},
		},
	},
};
