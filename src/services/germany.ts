import { GermanyClient } from '@src/clients/germany'
import { FixerIoClient } from '@src/clients/fixer-io'
import { CountryService } from '@src/controllers/germany'

export class Germany implements CountryService {
  private germanyClient: GermanyClient
  private fixerIoClient: FixerIoClient

  constructor(germanyClient: GermanyClient, fixerIoClient: FixerIoClient) {
    this.germanyClient = germanyClient
    this.fixerIoClient = fixerIoClient
  }

  public async travelInfo(): Promise<{
    appointment: boolean
    travelBan: string
  }> {
    const appointment = await this.germanyClient.fetchPoaAppointment()
    const travelBan = await this.germanyClient.fetchTravelBan()
    return { appointment, travelBan }
  }
}
