const axios = require('axios')
const FormData = require('form-data')
const anyStyleToHtml = require('./anystyleToHtml')

const serverUrl = 'http://localhost:4567'

const parseCitations = async references => {
  // 1 pass references to anystyle
  const form = new FormData()
  form.append('references', references)

  // Model for this (from https://hub.docker.com/r/boosen/anystyle):
  // 	curl --location --request POST 'http://localhost:4567' \
  // --form 'references="Derrida, J. (1967). L’écriture et la différence (1 éd.). Paris: Éditions du Seuil.
  // Vassy, J.L.; Christensen, K.D.; Schonman, E.F.; Blout, C.L.; Robinson, J.O.; Krier, J.B.; Diamond, P.M.; Lebo, M.; Machini, K.; Azzariti, D.R.; et al. The Impact of Whole-Genome Sequencing on the Primary Care and Outcomes of Healthy Adult Patients. Ann. Intern. Med. 2017, 167, 159–169, https://doi.org/10.7326/M17-018."'

  await axios
    .post(serverUrl, form, {
      headers: form.getHeaders(),
    })
    .then(res => {
      const htmledResult = anyStyleToHtml(res.data)
      console.log(htmledResult)
    })
    .catch(error => {
      console.log(error)
      // console.log('Error: ', error)
    })

  // 2 pass results to anyStyleToHtml
}

const string = `Derrida, J. (1967). L’écriture et la différence (1 éd.). Paris: Éditions du Seuil.
Vassy, J.L.; Christensen, K.D.; Schonman, E.F.; Blout, C.L.; Robinson, J.O.; Krier, J.B.; Diamond, P.M.; Lebo, M.; Machini, K.; Azzariti, D.R.; et al. The Impact of Whole-Genome Sequencing on the Primary Care and Outcomes of Healthy Adult Patients. Ann. Intern. Med. 2017, 167, 159–169, https://doi.org/10.7326/M17-018.`

parseCitations(string)
