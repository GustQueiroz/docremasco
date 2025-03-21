"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  MenuIcon,
  X,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["Inicio", "Cardápio", "Como Chegar", "Sobre Nós"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const openWhatsApp = () => {
    const phoneNumber = "5511988046178"; // Formatado para WhatsApp (55 + DDD + número)
    const message = encodeURIComponent("Vim do site e tenho interesse");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-2"
            ></motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-red-600"
            >
              Docremasco
            </motion.h1>
          </div>

          <nav className="hidden md:flex space-x-6">
            {["Inicio", "Cardápio", "Como Chegar", "Sobre Nós"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </nav>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col">
              {["Inicio", "Cardápio", "Como Chegar", "Sobre Nós"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`py-2 text-left text-sm font-medium transition-colors ${
                      activeSection === section
                        ? "text-red-600"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </header>

      <section
        id="home"
        className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-red-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <Badge className="mb-4 bg-red-100 text-red-600 hover:bg-red-200">
                Aberto das 6:00 às 15:00
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                <span className="text-red-600">Docremasco</span> <br />O melhor
                lugar para matar sua fome
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Sabores incríveis, atendimento rápido e preços justos. Venha
                experimentar nossos lanches artesanais e bebidas refrescantes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("menu")}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Ver Cardápio
                </Button>
                <Button
                  onClick={() => scrollToSection("location")}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  Como Chegar
                </Button>
                <Button
                  onClick={openWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Chame no WhatsApp
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/rua.jpeg"
                  alt="Docremasco Food Truck"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white">
                    <Clock size={16} />
                    <span className="text-sm">6:00 - 15:00</span>
                  </div>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    Food Truck
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-2 bg-orange-100 text-orange-600 hover:bg-orange-200">
              Cardápio
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Produtos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todos os nossos produtos são preparados na hora com ingredientes
              frescos e de qualidade. Experimente e se apaixone pelos sabores do
              Docremasco!
            </p>
          </motion.div>

          <Tabs defaultValue="lanches" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="lanches"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Lanches
              </TabsTrigger>
              <TabsTrigger
                value="bebidas"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Bebidas
              </TabsTrigger>
              <TabsTrigger
                value="salgados"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Salgados
              </TabsTrigger>
              <TabsTrigger
                value="almoços"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Almoços
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lanches">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    name: "X Burguer",
                    description: "Hambúrguer, maionese e queijo",
                    price: "R$ 10,00",
                    image: "/xburguer.jpeg",
                  },
                  {
                    name: "X Egg",
                    description: "Hambúrguer, maionese, queijo, alface e ovo",
                    price: "R$ 15,00",
                    image: "/xegg.jpeg",
                  },
                  {
                    name: "X Bacon",
                    description: "Hambúrguer, maionese, queijo, alface e bacon",
                    price: "R$ 15,00",
                    image: "/xbacon.jpeg",
                  },
                  {
                    name: "X Churrasco",
                    description: "Bife, queijo, maionese, alface e tomate",
                    price: "R$ 18,00",
                    image: "/xchurrasco.jpeg",
                  },
                  {
                    name: "X Salada",
                    description:
                      "Hambúrguer, maionese, queijo, alface e tomate",
                    price: "R$ 12,00",
                    image: "/xsalada.jpeg",
                  },
                  {
                    name: "X Calabresa",
                    description: "Calabresa, queijo, maionese, alface e tomate",
                    price: "R$ 15,00",
                    image: "/xcalabresa.jpeg",
                  },
                  {
                    name: "Americano",
                    description:
                      "Presunto, queijo, ovo, maionese, alface e tomate",
                    price: "R$ 15,00",
                    image: "/americano.jpeg",
                  },
                  {
                    name: "Misto Quente",
                    description: "Presunto e queijo",
                    price: "R$ 9,00",
                    image: "/misto.jpeg",
                  },
                  {
                    name: "Pão com Manteiga",
                    description: "Margarina",
                    price: "R$ 4,00",
                    image: "/paonachapa.jpeg",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex p-4">
                        <div className="mr-4 relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-0 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="font-bold text-red-600">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="bebidas">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    name: "Guaraviton 500ml",
                    description: "",
                    price: "R$ 7,00",
                    image: "/guaraviton.jpeg",
                  },
                  {
                    name: "Refrigerante Lata",
                    description: "",
                    price: "R$ 7,00",
                    image: "/refrigerantelata.jpeg",
                  },
                  {
                    name: "Refrigerante 200ml",
                    description: "",
                    price: "R$ 4,00",
                    image: "/refrigerante200ml.jpeg",
                  },
                  {
                    name: "Toddynho",
                    description: "",
                    price: "R$ 4,00",
                    image: "/toddynho.webp",
                  },
                  {
                    name: "Água sem Gás",
                    description: "",
                    price: "R$ 3,00",
                    image: "/aguasemgas.jpeg",
                  },
                  {
                    name: "Água com Gás",
                    description: "",
                    price: "R$ 5,00",
                    image: "/aguacomgas.jpeg",
                  },
                  {
                    name: "Suco Dell Vale",
                    description: "",
                    price: "R$ 7,00",
                    image: "/sucodelvale.jpeg",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex p-4">
                        <div className="mr-4 relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-0 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="font-bold text-red-600">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="salgados">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    name: "Pão de Queijo",
                    description: "",
                    price: "R$ 5,00",
                    image: "/paodequeijo.jpeg",
                  },
                  {
                    name: "Salgados",
                    description: "Diversos",
                    price: "R$ 7,00",
                    image: "/salgados.jpeg",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex p-4">
                        <div className="mr-4 relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-0 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="font-bold text-red-600">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="almoços">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    name: "Picadinho com Farofa",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Calabresa Acebolada com Ovo",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Strogonoff de Frango",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Filé de Frango Grelhado",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Filé de Frango à Milanesa",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Filé de Frango à Parmegiana",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Omelete",
                    description: "Marmitex com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Terça: Baião de Dois",
                    description:
                      "Especial de terça-feira com mandioca e linguiça toscana",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Quarta: Feijoada",
                    description:
                      "Especial de quarta-feira com bisteca, couve e farofa",
                    price: "R$ 28,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Quinta: Macarrão à Bolonhesa",
                    description:
                      "Especial de quinta-feira com filé de frango empanado",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                  {
                    name: "Sexta: Filé de Peixe com Purê",
                    description: "Especial de sexta-feira com arroz e feijão",
                    price: "R$ 24,00",
                    image: "/placeholder.svg",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex p-4">
                        <div className="mr-4 relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-0 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="font-bold text-red-600">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="location" className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
              Localização
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onde Estamos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Venha nos visitar! Estamos localizados em um ponto de fácil
              acesso.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Endereço
                        </h3>
                        <p className="text-gray-600">
                          Rua Adalberto Kemeny, 55 - Barra Funda
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Horário de Funcionamento
                        </h3>
                        <p className="text-gray-600">
                          Segunda a Sexta: 6:00 às 15:00
                        </p>
                        <p className="text-gray-600">
                          Sabados e Domingos: Fechado
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Contato
                        </h3>
                        <p className="text-gray-600">(11) 98804-6178</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/mapa.png"
                  alt="Mapa de localização"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Rua Adalberto Kemeny 55",
                        "_blank"
                      )
                    }
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Ver no Google Maps
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-2 bg-red-100 text-red-600 hover:bg-red-200">
              Sobre Nós
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Docremasco
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça um pouco mais sobre nossa história e nosso compromisso com
              a qualidade.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/rua.jpeg"
                  alt="Docremasco Food Truck"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nossa História
              </h3>
              <p className="text-gray-600 mb-4">
                O Docremasco nasceu da paixão por comida de qualidade e
                acessível. Estamos no bairro a mais de 26 anos, e nos tornamos
                um ponto de referência na região, oferecendo lanches deliciosos,
                preparados com ingredientes frescos e muito carinho.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa missão é proporcionar momentos de prazer gastronômico para
                nossos clientes, com um atendimento rápido e cordial, em um
                ambiente acolhedor e descontraído.
              </p>
              <p className="text-gray-600 mb-6">
                Valorizamos a qualidade dos nossos produtos e o respeito aos
                nossos clientes, buscando sempre inovar e melhorar para oferecer
                a melhor experiência possível.
              </p>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => scrollToSection("menu")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Conheça Nosso Cardápio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Venha nos Visitar!
            </h2>
            <p className="text-lg mb-8">
              Estamos esperando por você com os melhores lanches e bebidas da
              região. Venha experimentar o sabor único do Docremasco!
            </p>
            <Button
              className="bg-white text-red-600 hover:bg-gray-100"
              size="lg"
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=Rua Adalberto Kemeny 55",
                  "_blank"
                )
              }
            >
              <MapPin className="mr-2 h-4 w-4" /> Como Chegar
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-red-500 mb-2">
                Docremasco
              </h3>
              <p className="text-gray-400 text-sm">
                O melhor lugar para matar sua fome
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-red-500 mr-2" />
                <span className="text-sm text-gray-400">
                  Rua Adalberto Kemeny, 55 - Barra Funda
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="text-red-500 mr-2" />
                <span className="text-sm text-gray-400">
                  Aberto das 6:00 às 15:00
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Docremasco. Todos os direitos
            reservados - Site feito por{" "}
            <a
              href="https://linkedin.com/in/gust-queiroz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Gustavo Queiroz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
