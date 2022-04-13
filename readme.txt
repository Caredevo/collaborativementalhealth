To edit independently :
1. Change port on each card to localhost of the backend
2. on App.js : change the identity
3. webpack.config.js to localhost, and host at port 3000

update component Frontend 
npm install crypto-js dompurify jsencrypt
npm install raw-loader --save-dev

backend : 
copy security.js file
copy private.key
npm install crypto crypto-js express-mongo-sanitize

css update : 
form-1-columns
input, textarea, select, placeholder
table, lmtable fontsize


FRONT END SECURITY : 

---in each SERVICE : 

    import {encryption, decryption, randomKey, clientEncryption} from '../Security';
    const form = formValues;
    var cipherKey = randomKey();

- props : 
    patientId: props.identity[0],
    permission : props.identity[1],
    provider : props.identity[2],
    practiceId: props.identity[3],
    externalId: props.identity[4], 
    config : props.identity[5],

- in POST/UPDATE DATA : 

    const encryptedData = encryption(form, cipherKey);

    if (this.state.record === null) {
        await axios.post(`${PORT}/add`, encryptedData, this.state.config)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    } else {
        await axios.post(`${PORT}/update`, encryptedData, this.state.config)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

- in GET DATA : 
     async componentDidMount() {
        var params = {
            id : this.state.patientId,
            key : cipherKey
        }; 
        var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
        if (res.data) {
            var decryptedRespond = decryption(res.data, cipherKey);
            this.setState({content: decryptedRespond}); 
        } 
    }

    async componentDidUpdate(prevProps) {
        if (this.state.dataState !== "Stable") {
            var params = {
                id : this.state.patientId,
                key : cipherKey
            }; 
            var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
            if (res.data) {
                var decryptedRespond = decryption(res.data, cipherKey);
                this.setState({content: decryptedRespond, dataState:"Stable"}); 
            } 
        }   
    }

- in DEL DATA =
   const handleDelete = async () => {
        var params = {
            id : this.state.record,
            key : cipherKey
        }; 
        await axios.delete(`${PORT}`, { params }, this.state.config);
        this.setState({showDelete:false, record:null, dataState:"New dataset"})
    }







BACKEND SECURITY :
let security = require('./security');

--sample GET:     
router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    History.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
    .then(data => {
        var encryptedRespond = security.encryption(data, cipherKey);
        res.json(encryptedRespond)
    })
    .catch(err => res.status(400).json('Error: ' + err));
    });
});

--sample POST:
   router.route('/add').post((req, res) => {

    var form = req.body;
    const payload = security.decryption(form);
 
    const patientId = payload.data.patientId;
    const abstinence = payload.data.abstinence;
    const treatment = payload.data.treatment;

    const newHistory = new History({
        patientId,
        abstinence,
        treatment
    });

    newHistory.save()
    .then(() => res.json('History added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

--sample DELETE : 
   router.route('/').delete((req, res) => {
        Substance.findByIdAndDelete(req.query.id)
        .then(() => res.json('Substance deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

--sample UPDATE:
    router.route('/update').post((req, res) => {
        var form = req.body;
        const payload = security.decryption(form);

        Legal.findById(payload.data._id)
        .then(legal => {
            legal.patientId = payload.data.patientId;
            legal.date = payload.data.date;
            legal.currentstatus= payload.data.currentstatus;
            
        legal.save()
            .then(() => res.json('Legal updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });