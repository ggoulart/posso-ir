import axios, { AxiosInstance } from 'axios'
import { parse } from 'node-html-parser'

export class GermanyClient {
  private request: AxiosInstance

  constructor(request: AxiosInstance) {
    this.request = request
  }

  public async fetchPoaAppointment(): Promise<boolean> {
    return axios
      .get('https://service2.diplo.de/rktermin/extern/choose_categoryList.do?locationCode=porta&realmId=996',
        { headers: { 'Accept-Language': 'pt-BR' } },
      )
      .then(resp => {
        return GermanyClient.parseAppointmentResp(resp.data)
      })
      .catch(err => {
        console.log(err)
        throw new Error('error to fetch appointment')
      })
  }

  public async fetchTravelBan(): Promise<string> {
    return axios.get('https://brasil.diplo.de/br-pt/coronavirus/2320108')
      .then(resp => {
        return GermanyClient.parseTravelBanResp(resp.data)
      })
      .catch(err => {
        console.log(err)
        throw new Error('error to fetch travel ban info')
      })
  }

  private static parseAppointmentResp(data: string): boolean {
    const parsedData = parse(data)
    const parsedText = parsedData.querySelector('#content').structuredText
    const controlText = 'Sistema de marcação online do Ministério Federal das Relações Externas &mdash; Porto Alegre Voltar atrás Selecione uma categoria'
    return parsedText !== controlText
  }

  private static parseTravelBanResp(data: string): string {
    const output = /Esta proibição de entrada e transporte foi prorrogada até (\d{2}\/\d{2}\/\d{4}) e poderá ser novamente prorrogada dependendo do desenvolvimento da pandemia/.exec(data)
    if (output) {
      return output[1]
    } else {
      throw  new Error('error to parse travel bans resp')
    }
  }
}