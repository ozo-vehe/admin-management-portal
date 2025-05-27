import { defineStore } from 'pinia'
import type { Booking, BookingData, BookingSlots, ResultTemplate } from '@/interface/booking'
import { useContainerLoop } from '@/composables/useContainer'
import type { AltContainer, ContainerDetails } from '@/interface/container'
import type { Invoice } from '@/interface/invoice'

const BASE_URL = 'https://booking-prototype.efl.africa/api/'
const TOS_BASE_URL = 'https://tosapi.efl.africa/containers/'
const API_KEY = 'G7kL9mP2qR8sT1vW3xY5zA0bC4dE6fH7jK9nM2pQ8rS1tV3wX5yZ'

// Define a store named "booking" with the state and actions
export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [] as BookingData[],
    filteredBookings: [] as BookingData[],
    bookedDates: [] as Date[],
    containers: {} as ContainerDetails,
    invoice: {} as Invoice,
    available_slots: {} as BookingSlots,
    show_container: false,
    token: '' as string,
  }),
  actions: {
    async updateToken() {
      const token = localStorage.getItem('token');
      token ? this.token = token : this.token = '';
    },
    async addSingleBooking(booking: Booking) {
      const TEST_TOKEN = localStorage.getItem('token')
      console.log(TEST_TOKEN)
      const req = await fetch(`${BASE_URL}bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(booking),
      })
      const res = await req.json()
      console.log(res)

      const result: ResultTemplate = {
        status: res.statusCode,
        message: res.message,
        container_number: res.data.containers[0].containerNumber,
      }
      return result
    },
    async addMultipleBookings(bookings: Booking) {
      const TEST_TOKEN = localStorage.getItem('token')
      console.log(TEST_TOKEN)
      const actual_bookings: Booking[] = bookings.container_number.map((container: string) => ({
        day: bookings.day,
        bl_number: bookings.bl_number,
        container_number: [container],
        command: bookings.command,
        phone: bookings.phone,
        agency_name: bookings.agency_name,
        invoice_number: bookings.invoice_number,
      }))
      console.log(actual_bookings)

      const req = await fetch(`${BASE_URL}bookings/multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(actual_bookings),
      })
      const res = await req.json()
      console.log(res)

      const results_array: ResultTemplate[] = []

      res.forEach((result: any) => {
        if (result.original.statusCode >= 20 && result.original.statusCode <= 299) {
          results_array.push({
            status: result.original.statusCode,
            message: result.original.message,
            container_number: result.original.data.containers[0].containerNumber
          })
        } else {
          results_array.push({
            status: result.original.statusCode,
            message: result.original.message,
          })
        }
      })

      return results_array
    },
    async fetchAllBookings() {
      await this.updateToken();

      const req = await fetch(`${BASE_URL}bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
      const res = await req.json()
      // this.bookings = res.data;
      const bookings = res.data.sort((a: any, b: any) => new Date(b.day).getTime() - new Date(a.day).getTime());

      // Fetch Edit Container numbers
      this.bookings = bookings.map((booking: any) => {
        booking.containers = booking.containers.map((container: any) => {
          return container.containerNumber;
        });

        const booking_renamed: BookingData = {
            agency_name: booking.agencyName,
            container_number: booking.containers,
            bl_number: booking.blNumber,
            invoice_number: booking.invoiceNumber,
            session_id: booking.sessionId,
            command: booking.command,
            day: booking.day,
            id: booking.id,
            phone: booking.phone,
            status: booking.status,
          }

        return booking_renamed;
      })

      this.filteredBookings = this.bookings;
      this.bookedDates = this.bookings.map((booking) => new Date(booking.day));
    },
    async getAvailableSlots(calendar_day: string) {
      const date = new Date(calendar_day.replace(/\//g, '-')).toISOString().slice(0, 19)
      console.log(date)
      try {
        const req = await fetch(`${BASE_URL}slot/detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ day: date }),
        })
        const res = await req.json()
        console.log(res)

        this.available_slots = res.data
        console.log(this.available_slots)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchContainers(bl_number: string) {
      try {
        const req = await fetch(`${TOS_BASE_URL}allmajorinfo?BLNo=${bl_number}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_KEY,
          },
        })
        const res = await req.json()
        console.log(res)
        if (res.status?.includes('404')) {
          // Redirect to use an alternative API
          const container = await this.fetchContainerAlt(bl_number)
          if (container.length <= 0) {
            this.containers = {} as ContainerDetails
            return res
          } else {
            const { processContainers, containers } = useContainerLoop()
            processContainers(container)
            this.containers = { containers: [...containers.value], receipt_number: '' }

            const new_res = [{ status: '200' }, ...container]
            this.show_container = true
            return new_res
          }
        }
        // Update the invoice property.
        this.invoice = {
          bl_number: res.status[0].BLNo,
          invoice_number: res.payments[0].InvoiceNo,
          receipt_number: res.payments[0].RecieptNo,
          customer_name: res.payments[0].Customer,
          payee_name: res.payments[0].PayeeName,
          currency: res.payments[0].Currency,
          invoice_value: res.payments[0].InvoiceValue,
          payment_date: res.payments[0].PaymentDate,
          reference_number: res.payments[0].RefNumber,
          validity: res.payments[0].Validity,
          date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          time: new Date()
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            .toLowerCase(),
        }
        // Use the loop composable function to process the containers
        const { processContainers, containers } = useContainerLoop()
        processContainers(res.status)
        this.containers = {
          containers: [...containers.value],
          receipt_number: res.payments[0].RecieptNo,
        }

        const new_res = [{ status: '200' }, ...res.status]
        this.show_container = true
        return new_res
      } catch (error) {
        return error
      }
    },
    async fetchContainerAlt(bl_number: string) {
      try {
        const formData = new FormData()
        formData.append('bl_number', bl_number)
        const req = await fetch('https://api.efl.africa/api/track', {
          method: 'POST',
          body: formData,
        })

        console.log(req)
        const res = await req.json()
        console.log(res)
        const formattedData = res.data.map((item: AltContainer) => ({
          UniqueID: item.id,
          ContainerNo: item.container_number,
          BLNo: item.bl_number,
          InDate: item.gate_in,
          OutDate: item.gate_out,
        }))

        return formattedData
      } catch (error) {
        return error
      }
    },
    async clearSearchDetails() {
      this.containers = {} as ContainerDetails
      this.show_container = false
      this.bookings = []
      this.available_slots = {} as BookingSlots
    },
    async confirmBooking(booking_id: string): Promise<any> {
      try {
        const req = await fetch(`${BASE_URL}bookings/${booking_id}/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          }
        })
        const res = await req.json()
        console.log(res);
        if(res.statusCode) {
          if(res.statusCode >= 200 && res.statusCode <= 299) {
            await this.fetchAllBookings();
            return {
              message: res.message,
              status: 'success',
              code: res.statusCode,
            }
          } else {
            throw new Error(res.message);
          }
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        return {
          message: error,
          status: 'error',
          code: 300,
        }
      }
    },
    async cancelBooking(booking_id: string, reason: string): Promise<any> {
      try {
        const req = await fetch(`${BASE_URL}booking/${booking_id}/cancel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ body: reason }),
        })
        const res = await req.json()
        console.log(res);
        if(res.statusCode) {
          if(res.statusCode >= 200 && res.statusCode <= 299) {
            await this.fetchAllBookings();
            return {
              message: res.message,
              status: 'success',
              code: res.statusCode,
            }
          } else {
            throw new Error(res.message);
          }
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        return {
          message: error as string,
          status: 'error',
          code: 300,
        }
      }
    }
  },
})
