let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

describe('API', () => {
    describe('/POST Login', () => {
        it('Testando POST, com login e senha corretos...', (done) => {
            let correto = {
                username: 'arthur.hvs@gmail.com',
                password: 'banana'
            }
            chai.request('http://localhost:8080')
            .post('/login')
            .send(correto)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
        it('Testando POST, com login e senha incorretos...', (done) => {
            let incorreto = {
                username: 'arthur.hvs@gmail.com',
                password: 'feijão'
            }
            chai.request('http://localhost:8080')
            .post('/login')
            .send(incorreto)
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
            
        })
    })
})
