import { ref } from 'vue'
import type { Container } from '@/interface/container'

export const useContainerLoop = () => {
  const containers = ref<Container[]>([])

  interface ResponseStatus {
    UniqueID: string
    ContainerNo: string
    BLNo: string
    InDate: string
    OutDate: string
  }

  const processContainers = (res: ResponseStatus[]) => {
    // Clear existing data first
    containers.value = []

    const totalItems = res.length

    for (let i = 0; i < totalItems; i++) {
      const container: Container = {
        id: res[i].UniqueID,
        container_no: res[i].ContainerNo,
        bl_no: res[i].BLNo,
        gated_in: res[i].InDate,
        gated_out: res[i].OutDate,
      }

      containers.value.push(container)
    }
  }
  return {
    containers,
    processContainers,
  }
}
