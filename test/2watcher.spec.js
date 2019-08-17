import myVue from '../src/index.js'

describe('watch data change', ()=>{
    it('basic usage', ()=>{
        let vm = new myVue({
            //el: '#app', // dom
            data(){ 
                return {// 数据
                    firstName: 'Zhi',
                    lastName: '',
                    fullName: ''
                }
            },
            watch: {
                lastName: function(){
                    //console.log('lastName', this._data.lastName)
                    this._data.fullName = this._data.lastName + '.' + this._data.firstName
                }
            }
        })  
        vm._data.lastName = 'Wang'
        //console.log(vm._data.fullName)
        expect(vm._data.fullName).toEqual('Wang.Zhi');
    })
})
