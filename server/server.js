const express = require('express');
const app = express();
const port = 3000;
const mariadb = require('mariadb');
const cors = require('cors');

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
			schemes: ['https', 'http']
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


async function asyncFunction() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query("SELECT 1 as val");
		console.log(rows); //[ {val: 1}, meta: ... ]
		const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
		console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
}
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
	// res.status(200).send('Agent Code');
	//connect to the database
	// perform the request that you need (SQL)
	//define the header
	//res.json(rows);
	// res.send('');
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
})
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
})
/**
 * @swagger
 * /studentreport:
 *  post:
 *    description: Use to create a new report
 *    responses:
 *      '201':
 *        description: A successful response
 *  parameters:
 *    - in: body
 *      name: studentreport
 *      required: true
 *      schema:
 *        type: object
 *        properties:
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
 *          grade:
 *            type: string
 *            example: a
 *          semister:
 *            type: string
 *            example: 1st
 *          class_attended:
 *            type: integer
 *            format: int64
 *            example: 80
 */
app.post('/studentreport', async (req, res) => {
	let conn;
	try {

		conn = await pool.getConnection();
		var query = "INSERT INTO studentreport (class, section, rollid, grade, semister, class_attended) VALUES ?";
		var rows = await conn.query(query, [studentreport.class, studentreport.section, studentreport.rollid, studentreport.grade, studentreport.semister, studentreport.class_attended]);
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
})
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
		var query = "INSERT INTO student (name, title, class, section, rollid) VALUES ?";
		var rows = await conn.query(query, [student.name, student.title, student.class, student.section, student.rollid]);
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
 * /agents/:agentid:
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
 *            example: 0.20
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
})
/**
 * @swagger
 * /agents:
 *  patch:
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
app.patch('/agents', async (req, res) => {
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
})
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
		var query = "update * from students";
		var rows = await conn.query(query);
		res.json(rows)
	}
	catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
