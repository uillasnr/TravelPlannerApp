import React, { createContext, useContext, useState } from "react"
import { Text, TextProps, TouchableOpacity, ActivityIndicator, TouchableOpacityProps, View, Image, Alert } from "react-native"
import clsx from "clsx"


type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}


const ThemeContext = createContext<{ variant?: Variants }>({})

function Button({
  variant = "primary",
  children,
  isLoading,
  className,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {flex: 1, height: 44, gap:5, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 8, padding: 8 },
        variant === "primary" ? { backgroundColor: "#A3E635" } : { backgroundColor: "#27272A" }
      ]}
      
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator color="#3F6212" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      style={[
        { fontSize: 16, fontWeight: "600" },
        variant === "primary" ? { color: "#3F6212" } : { color: "#D4D4D8" }
      ]}
    >
      {children}
    </Text>
  )
}


Button.Title = Title

export { Button }


export default function Index() {
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)

  function handleNextStepForm() {
    Alert.alert("Botão", "Botão pressionado")
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>
      <Image source={require('@/assets/logo.png')} style={{ height: 32 }} resizeMode="contain" />
      <Text style={{ color: "#9CA3AF", textAlign: "center", fontSize: 18, marginTop: 8 }}>
        Convide seus amigos e planeje sua próxima viagem
      </Text>
      <Button onPress={handleNextStepForm} isLoading={isCreatingTrip}>
        <Button.Title>Continuar</Button.Title>
      </Button>
    </View>
  )
}



