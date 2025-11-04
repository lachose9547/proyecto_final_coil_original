import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";  
 window.Buffer = Buffer;           
import logo_superior from "../img/logo_superior.jpeg";
import firma11 from "../img/firma11.jpeg";
import firma12 from "../img/firma12.jpeg";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import QRCode from "qrcode";
import bwipjs from "bwip-js";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    border: "8 solid #003366",
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30,
},

logo_superior: {
  width: 100,
  height: 75,
  alignSelf: "center",
    marginTop: 0,
},


  body: {
    textAlign: "center",
    marginTop: 2,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 15,
    textDecoration: "underline",
    color: "#1a237e",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 6,
  },
  details: {
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
  },
  signaturesRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 40,
    alignItems: "flex-start",
  },
  signatureBox: {
    textAlign: "center",
    width: "50%",
    fontSize: 13,
    fontWeight: "bold",
  },
  signatureImg: {
    width: 120,
    height: 50,
    marginBottom: 5,
  },

  firma11: {
    width: 120,
    height: 50,
  alignSelf: "center",
  marginTop: 5,
  

  },  
  firma12: {
    width: 120,
    height: 50,
    alignSelf: "center",
     marginTop: 5,
  },
  qr: {
    width: 65,
    height: 50,
    marginTop: 5,
    alignSelf: "center",
  },
  barcode: {
    width: 100,
    height: 50,
    marginTop:5,
    alignSelf: "center",
  },
});

function Pdf() {
  const location = useLocation();
 const usuario = location.state?.usuario || { nombre: "", apellido: "" };



  const [qrDataUrl, setQrDataUrl] = useState("");
  const [barcodeDataUrl, setBarcodeDataUrl] = useState("");
  

  useEffect(() => {
    // Generar QR
    QRCode.toDataURL("https://coil.ipl.edu.do/vista/inicio.php")
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generando QR:", err));

    // Generar código de barras
    try {
      const canvas = document.createElement("canvas");
      bwipjs.toCanvas(canvas, {
        bcid: "code128",
        text: String(usuario[0]?.id_Usuario || ""),
        scale: 3,
        height: 10,
        includetext: true,
      });
      setBarcodeDataUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Error generando código de barras:", err);
    }
  }, []);

  // Esperar a que QR y barcode estén generados
  if (!qrDataUrl || !barcodeDataUrl) return null;

  return (
    usuario?.map((user, index) => (      
    <PDFViewer key={index} style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          {/* Logos */}
          <View style={styles.headerRow}>
            <Image style={styles.logo_superior} src={logo_superior} />
          </View>

          {/* Cuerpo */}
          <View style={styles.body}>
            <Text style={styles.title}>Otorga el presente certificado a</Text>
            <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
            <Text style={styles.subtitle}>Por haber participado como ponente en el</Text>
            <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
              Congreso de Ingeniería Loyola COIL {String(user.ciclo1).slice(0, 4)}
            </Text>
            <Text style={styles.subtitle}>Transformación Digital</Text>
          </View>

          {/* Detalles */}
          <Text style={styles.details}>
            Dado en la provincia de San Cristóbal, República Dominicana,
            {"\n"}en el mes de noviembre del {String(user.ciclo1).slice(0, 4)}
          </Text>

          {/* Firmas con QR y código de barras juntos */}
          <View style={styles.signaturesRow}>
            <View style={styles.signatureBox}>
              <Image style={styles.firma11} src={firma11} />
              <Text>P. José Victoriano, S.J.</Text>
              <Text>Rector</Text>
              <Image style={styles.qr} src={qrDataUrl} />
            </View>

            <View style={styles.signatureBox}>
              <Image style={styles.firma12} src={firma12} />
              <Text>Carlos Napoleón Pereira M., M.A.</Text>
              <Text>Director de la Facultad de Ingeniería</Text>
              <Image style={styles.barcode} src={barcodeDataUrl}  />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
    ))
  );
}

export default Pdf;
