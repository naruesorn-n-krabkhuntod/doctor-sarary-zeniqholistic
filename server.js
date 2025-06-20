const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:5500'}));



// API
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/allempoyee', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  connection.query('SELECT * FROM empoyee', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
    }
    res.json(results);
  });
  connection.end();
});



app.get('/api/allapprover', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  connection.query('SELECT * FROM approver', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
    }
    res.json(results);
  });
  connection.end();
});



app.get('/api/empoyee', (req, res) => {
  const { empoyee_id } = req.query;
  const sql = 'SELECT * FROM empoyee WHERE empoyee_id = ?';
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  connection.query(sql, [empoyee_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
    }
    console.log(results)
    res.json(results);
  });
  connection.end();
});


app.get('/api/payroll', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  const { year, month } = req.query;
  const sql = `
    SELECT payroll.*, empoyee.*, approver.*
    FROM payroll
    INNER JOIN empoyee ON payroll.empoyee_id = empoyee.empoyee_id
    INNER JOIN approver ON payroll.approver = approver.ap_id
    WHERE payroll.year = ? AND payroll.month = ?
  `;

  connection.query(sql, [year, month], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด', details: err });
    }
    res.json(results);  
  });
  connection.end();
});

app.get('/api/payrollid', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  const { id } = req.query;
  const sql = `
    SELECT payroll.*, empoyee.*, approver.* FROM payroll
    INNER JOIN empoyee ON payroll.empoyee_id = empoyee.empoyee_id
    INNER JOIN approver ON payroll.approver = approver.ap_id
    WHERE payroll.id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด', details: err });
    }
    res.json(results);
  });
  connection.end();
});

app.get('/api/addpayroll', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  const { id, month, year, empoyee_id, title, data, title_rm, data_rm, approver } = req.query;
  const sql = "INSERT INTO `payroll`(`id`, `month`, `year`, `empoyee_id`, `title`, `data`, `title_rm`, `data_rm`, `approver`) VALUES (?,?,?,?,?,?,?,?,?)";

  connection.query(sql, [id, month, year, empoyee_id, title, data, title_rm, data_rm, approver], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด', details: err });
    }
    res.json(results);
  });
  connection.end();
});

app.get('/api/updatepayroll', (req, res) => {
  const connection = mysql.createConnection({
    host: '27.254.145.132',
    user: 'zeniq_admin',
    password: 'Zeniq12345!',
    database: 'zeniq_payroll',
    port: 3306
  });
  connection.connect((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จที่ ID ' + connection.threadId);
  });
  const { id, month, year, empoyee_id, title, data, title_rm, data_rm, approver } = req.query;
  const sql = "UPDATE `payroll` SET `id`=?,`month`=?,`year`=?,`empoyee_id`=?,`title`=?,`data`=?,`title_rm`=?,`data_rm`=?,`approver`=? WHERE `id` = ?";

  connection.query(sql, [id, month, year, empoyee_id, title, data, title_rm, data_rm, approver, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาด', details: err });
    }
    res.json(results);
  });
  connection.end();
});


app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:${PORT}`);
});