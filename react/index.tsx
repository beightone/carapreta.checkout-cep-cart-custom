import React, { Component } from 'react'

import { Logger } from './utils/loggerDataDog'

const logger = new Logger()

class CheckoutCheckingInformations extends Component<{}, CheckoutCheckingInformationsState> {
  constructor(props: any) {
    super(props)
    this.state = {
      orderForm: null,
    }
  }

  setOrderForm = (_: any, orderForm: OrderForm) => {
    this.setState({ orderForm })
    const postalCode = orderForm.shippingData.address.postalCode
    console.log(postalCode, orderForm)
    logger.info(`CHECKOUT_DATA_INFORMATION ${postalCode}`, JSON.stringify(orderForm))
    console.log('entrou no setOrderForm 2 ', orderForm)
  }

  componentDidMount() {
    $(window).on('orderFormUpdated.vtex', this.setOrderForm)
  }

  componentWillUnmount() {
    $(window).off('orderFormUpdated.vtex', this.setOrderForm)
  }
  render() {
    return null
  }
}

interface CheckoutCheckingInformationsState {
  orderForm: OrderForm | null
}

export default CheckoutCheckingInformations
