const express = require('express');
const app = express();
const port = 3000;
const mariadb = require('mariadb');
const cors = require('cors');
const axios = require('axios');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
	swaggerDefinition: {

		info: {
			title: 'Swagger Assignment 8',
			description: 'Swagger for assignment 8',
			contact: {
				name: 'Anitra Griffin',
			},
			servers: ['https://localhost:3000'],
			schemes: ['http', 'https']
			// servers: ['http://localhost:3000', 'http://206.81.3.222:3000/']
		}
	},
	// './routes/*.js'
	apis: ['./server.js']

};

app.use(cors());

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sample',
	port: 3306,
	connectionLimit: 5
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

// async function asyncFunction() {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("SELECT 1 as val");
//         console.log(rows); //[ {val: 1}, meta: ... ]
//         const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) return conn.release();
//     }
// }
//routes

/**
/**
 * @swagger
 * /agentcode:
 *  get:
 *    description: Use to request agent codes
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/agentcode', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "select AGENT_CODE from agents";
		var rows = await conn.query(query);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /listofitem:
 *  get:
 *    description: Use to request all items in list of item
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/listofitem', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "select * from listofitem";
		var rows = await conn.query(query);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
})
/**
 * @swagger
 * /student:
 *  get:
 *    description: Use to request all students
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/student', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "select * from student";
		var rows = await conn.query(query);
		res.send(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /agents:
 *  get:
 *    description: Use to request all agents
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/agents', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "select * from agents";
		var rows = await conn.query(query);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /agents/:
 *  post:
 *    summary: new agent
 *    description: Use to create a new agent
 *    responses:
 *      '200':
 *        description: A successful created agent
 *    parameters:
 *    - in: body
 *      name: item
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          agent_code:
 *            type: string
 *            example: A423
 *          agent_name:
 *            type: string
 *            example: Anitra Griffin
 *          working_area:
 *            type: string
 *            example: Siberia
 *          commission:
 *            type: integer
 *            format: int64
 *            example: 2
 *          phone_no:
 *            type: string
 *            example: 888-5551234
 *          country:
 *            type: string
 *            example: \r
 */
app.post('/agent', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "INSERT INTO agents VALUES (agent_code, agent_name, working_area, commission, phone_no, country)";
		var rows = await conn.query(query, [agents.agent_code, agents.agent_name, agents.working_area, agents.commission, agents.phone_no, agents.country]);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /student:
 *  post:
 *    summary: new student
 *    description: Use to create a new student
 *    responses:
 *      '201':
 *        description: A successful created new student
 *    parameters:
 *    - in: body
 *      name: student
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: Anitra
 *          title:
 *            type: string
 *            example: Griffin
 *          class:
 *            type: string
 *            example: Math
 *          section:
 *            type: string
 *            example: II
 *          rollid:
 *            type: integer
 *            format: int64
 *            example: 2
 */
app.post('/student', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "INSERT INTO student (name, title, class, section, rollid) VALUES ?";
		var rows = await conn.query(query, [student.name, student.title, student.class, student.section, student.rollid]);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /listofitem:
 *  post:
 *    summary: new item
 *    description: Use to create a new item on list
 *    responses:
 *      '201':
 *        description: A successful created new item
 *    parameters:
 *    - in: body
 *      name: item
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          itemcode:
 *            type: string
 *            example: I005
 *          itemname:
 *            type: string
 *            example: Pickles
 *          batchcode:
 *            type: string
 *            example: DM/2330
 *          coname:
 *            type: string
 *            example: Sizzlers
 */
app.post('/listofitem', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "INSERT INTO listofitem (name, title, class, section, rollid) VALUES ?";
		var rows = await conn.query(query, [student.name, student.title, student.class, student.section, student.rollid]);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /agents/:agent_code:
 *  put:
 *    summary: update agent
 *    description: Use to update an agent
 *    responses:
 *      '201':
 *        description: A successful updated agent
 *    parameters:
 *    - in: body
 *      name: item
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          agent_code:
 *            type: string
 *            example: A423
 *          agent_name:
 *            type: string
 *            example: Anitra Griffin
 *          working_area:
 *            type: string
 *            example: Siberia
 *          commission:
 *            type: integer
 *            format: int64
 *            example: 2
 *          phone_no:
 *            type: string
 *            example: 888-5551234
 *          country:
 *            type: string
 *            example: \r
 */
app.put('/agents/:agentid', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "select * from agents";
		var rows = await conn.query(query);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /listofitem/:itemcode:
 *  delete:
 *    summary: delete item
 *    description: Use to delete an item from list
 *    responses:
 *      '201':
 *        description: A successful deleted an item
 *    parameters:
 *    - in: body
 *      name: item
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          itemcode:
 *            type: string
 *            example: I005
 *          itemname:
 *            type: string
 *            example: Pickles
 *          batchcode:
 *            type: string
 *            example: DM/2330
 *          coname:
 *            type: string
 *            example: Sizzlers
 */
app.delete('/listofitem/:itemcode', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "delete from listofitem where itemcode = ?";
		var rows = await conn.query(query, [listofitem.itemcode]);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});
/**
 * @swagger
 * /student:
 *  patch:
 *    summary: updated student
 *    description: Use to update a student
 *    responses:
 *      '201':
 *        description: A successful updated a student
 *    parameters:
 *    - in: body
 *      name: student
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: Anitra
 *          title:
 *            type: string
 *            example: Griffin
 *          class:
 *            type: string
 *            example: Math
 *          section:
 *            type: string
 *            example: II
 *          rollid:
 *            type: integer
 *            format: int64
 *            example: 2
 */
app.patch('/students', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		// var query = "update * from st÷udents";
		var query = "Update student set NAME = ?, TITLE= ?, CLASS = ?, SECTION = ? where ROLLID = ?";
		var rows = await conn.query(query, [student.name, student.title, student.class, student.section, student.rollid]);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

app.get('/say', async (req, res) => {
	console.log('query', req.query.keyword)
	let cloudUrl = 'https://zvrt6ewdy6hjr2rb6oegyb63q40udsoh.lambda-url.us-east-2.on.aws/?keyword=' + req.query.keyword;
	axios.get(cloudUrl)
		.then((cloudRes) => {
			msg = cloudRes.data;
			console.log("Cloud Response: " + msg);
			res.json(msg);
		})
		.catch((err) => {
			// console.log(err);
			res.status(500).send(err);
		})
		.then(() => { });
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});
