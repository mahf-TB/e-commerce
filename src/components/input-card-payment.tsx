"use client"

import { CreditCardIcon } from "lucide-react"
import { useId, useState } from "react"
import { usePaymentInputs } from "react-payment-inputs"
import images, { type CardImages } from "react-payment-inputs/images"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CardPaymentInputsProps = {
  onCardDataChange?: (cardData: {
    cardNumber: string
    expiryDate: string
    cvc: string
    cardType: any
    isTouched: boolean
    error: string | null
  }) => void
  disabled?: boolean
  containerClassName?: string
  label?: string
  hideLabel?: boolean
}

export default function InputCardPayment({
  onCardDataChange,
  disabled = false,
  containerClassName,
  label = "Détails de la carte",
  hideLabel = true,
}: CardPaymentInputsProps) {
  const id = useId()
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCardNumber(value)
    notifyChanges(value, expiryDate, cvc)
  }

  const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setExpiryDate(value)
    notifyChanges(cardNumber, value, cvc)
  }

  const handleChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCvc(value)
    notifyChanges(cardNumber, expiryDate, value)
  }

  const notifyChanges = (
    cardNum: string,
    expiry: string,
    cvcVal: string
  ) => {
    onCardDataChange?.({
      cardNumber: cardNum,
      expiryDate: expiry,
      cvc: cvcVal,
      cardType: meta.cardType ,
      isTouched: meta.isTouched,
      error: meta.error || null,
    })
  }

  return (
    <fieldset
      className={cn("space-y-3", containerClassName)}
      disabled={disabled}
    >
      {!hideLabel && label && (
        <Label className="font-medium text-sm">{label}</Label>
      )}

      <div className="rounded-none shadow-xs overflow-hidden">
        {/* Numéro de carte */}
        <div className="relative focus-within:z-10">
          <Input
            className="peer rounded-none pe-9 shadow-none [direction:inherit]"
            disabled={disabled}
            value={cardNumber}
            {...getCardNumberProps({ onChange: handleChangeCardNumber })}
            id={`number-${id}`}
          />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {meta.cardType ? (
              <svg
                className="overflow-hidden rounded-sm"
                {...getCardImageProps({
                  images: images as unknown as CardImages,
                })}
                width={20}
              />
            ) : (
              <CreditCardIcon aria-hidden="true" size={16} />
            )}
          </div>
        </div>

        {/* Date d'expiration + CVC */}
        <div className="-mt-px flex">
          <div className="min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-none shadow-none [direction:inherit]"
              disabled={disabled}
              value={expiryDate}
              {...getExpiryDateProps({
                onChange: handleChangeExpiryDate,
              })}
              id={`expiry-${id}`}
            />
          </div>
          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-none shadow-none [direction:inherit]"
              disabled={disabled}
              value={cvc}
              {...getCVCProps({
                onChange: handleChangeCVC,
              })}
              id={`cvc-${id}`}
            />
          </div>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {meta.isTouched && meta.error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded mx-3">
          <p className="text-sm text-destructive">
            {meta.error}
          </p>
        </div>
      )}

      {/* Message informatif */}
      <p className="text-xs text-muted-foreground px-3">
        Vos informations sont sécurisées et ne seront jamais partagées.
      </p>
    </fieldset>
  )
}
