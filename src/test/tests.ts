import * as mocha from 'mocha';
import * as chai from 'chai';
import * as asPromised from 'chai-as-promised';
import { Client, MockServer } from '../index';
chai.use(asPromised);
const expect = chai.expect;

describe('Client', function () {
    const opts = {
        port: 9092
    }

    let server =  new MockServer(opts);
    server.start();

    beforeEach(function() {
        server.clear();
    });

    const client = new Client(null, opts);
    describe('#getAllTorrents()', function () {
        it('should call without error', function () {
            return client.getAllTorrents();
        });

        it('should return an array', function () {
            return expect(client.getAllTorrents()).to.eventually.be.an('array');
        });

        it('should have a valid RPC call', function (done) {
            client.once('request', (data) => {
                try {
                    expect(data).to.have.all.keys('method', 'arguments')
                    expect(data.arguments).to.have.property('fields');
                } catch (e) {
                    done(e);
                    return;
                }
                done();
            });

            client.getAllTorrents().catch(done);
        });
    });

    describe('#getTorrent()', function () {
        context('when called with string', function () {
            it('should call without error', function () {
                return client.getTorrent("recently-active");
            });

            it('should return an array', function () {
                return expect(client.getTorrent("recently-active")).to.eventually.be.an('array');
            });
        });
    });
});