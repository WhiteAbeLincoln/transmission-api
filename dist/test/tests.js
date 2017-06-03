"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const asPromised = require("chai-as-promised");
const index_1 = require("../index");
chai.use(asPromised);
const expect = chai.expect;
describe('Client', function () {
    const opts = {
        port: 9092
    };
    let server = new index_1.MockServer(opts);
    server.start();
    beforeEach(function () {
        server.clear();
    });
    const client = new index_1.Client(null, opts);
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
                    expect(data).to.have.all.keys('method', 'arguments');
                    expect(data.arguments).to.have.property('fields');
                }
                catch (e) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L3Rlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTZCO0FBQzdCLCtDQUErQztBQUMvQyxvQ0FBOEM7QUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDZixNQUFNLElBQUksR0FBRztRQUNULElBQUksRUFBRSxJQUFJO0tBQ2IsQ0FBQTtJQUVELElBQUksTUFBTSxHQUFJLElBQUksa0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZixVQUFVLENBQUM7UUFDUCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzFCLEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFLFVBQVUsSUFBSTtZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUk7Z0JBQ3hCLElBQUksQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQTtvQkFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNULElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN0QixPQUFPLENBQUMseUJBQXlCLEVBQUU7WUFDL0IsRUFBRSxDQUFDLDJCQUEyQixFQUFFO2dCQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdCQUF3QixFQUFFO2dCQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9jaGEgZnJvbSAnbW9jaGEnO1xuaW1wb3J0ICogYXMgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIGFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBDbGllbnQsIE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9pbmRleCc7XG5jaGFpLnVzZShhc1Byb21pc2VkKTtcbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuXG5kZXNjcmliZSgnQ2xpZW50JywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgIHBvcnQ6IDkwOTJcbiAgICB9XG5cbiAgICBsZXQgc2VydmVyID0gIG5ldyBNb2NrU2VydmVyKG9wdHMpO1xuICAgIHNlcnZlci5zdGFydCgpO1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VydmVyLmNsZWFyKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KG51bGwsIG9wdHMpO1xuICAgIGRlc2NyaWJlKCcjZ2V0QWxsVG9ycmVudHMoKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHdpdGhvdXQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xpZW50LmdldEFsbFRvcnJlbnRzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGVjdChjbGllbnQuZ2V0QWxsVG9ycmVudHMoKSkudG8uZXZlbnR1YWxseS5iZS5hbignYXJyYXknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGEgdmFsaWQgUlBDIGNhbGwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgY2xpZW50Lm9uY2UoJ3JlcXVlc3QnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLmFsbC5rZXlzKCdtZXRob2QnLCAnYXJndW1lbnRzJylcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGRhdGEuYXJndW1lbnRzKS50by5oYXZlLnByb3BlcnR5KCdmaWVsZHMnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNsaWVudC5nZXRBbGxUb3JyZW50cygpLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCcjZ2V0VG9ycmVudCgpJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250ZXh0KCd3aGVuIGNhbGxlZCB3aXRoIHN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB3aXRob3V0IGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGllbnQuZ2V0VG9ycmVudChcInJlY2VudGx5LWFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0KGNsaWVudC5nZXRUb3JyZW50KFwicmVjZW50bHktYWN0aXZlXCIpKS50by5ldmVudHVhbGx5LmJlLmFuKCdhcnJheScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il19
