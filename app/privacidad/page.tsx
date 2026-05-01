import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - OpiumLATAM',
  description: 'Política de privacidad de OpiumLATAM - Noticias de Hip-Hop en español para Latinoamérica',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[var(--bg2)] rounded-lg p-8 border border-[var(--border)]">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--head)] mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-invert max-w-none text-[var(--text)]">
            <p className="text-[var(--text2)] mb-8">
              Última actualización: {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">1. Introducción</h2>
              <p className="text-[var(--text2)] mb-4">
                En OpiumLATAM, nos comprometemos a proteger tu privacidad. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestro sitio web.
              </p>
              <p className="text-[var(--text2)]">
                Al acceder y usar opiumlatam.com, aceptas esta política de privacidad y el procesamiento de tus datos personales según lo descrito en este documento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">2. Información que Recopilamos</h2>

              <h3 className="text-xl font-semibold text-[var(--head)] mb-3">2.1 Información que nos proporcionas voluntariamente</h3>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Dirección de correo electrónico (para suscripciones al newsletter)</li>
                <li>Nombre (opcional)</li>
                <li>Comentarios y feedback</li>
                <li>Preferencias de contenido</li>
              </ul>

              <h3 className="text-xl font-semibold text-[var(--head)] mb-3">2.2 Información recopilada automáticamente</h3>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Sistema operativo</li>
                <li>Sitios web de referencia</li>
                <li>Tiempo de visita y páginas visitadas</li>
                <li>Dispositivo y ubicación aproximada</li>
              </ul>

              <h3 className="text-xl font-semibold text-[var(--head)] mb-3">2.3 Cookies y tecnologías similares</h3>
              <p className="text-[var(--text2)]">
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">3. Cómo Usamos tu Información</h2>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Proporcionar y mantener nuestro servicio</li>
                <li>Enviar notificaciones y actualizaciones del newsletter</li>
                <li>Mejorar la experiencia del usuario</li>
                <li>Analizar el uso del sitio y optimizar el contenido</li>
                <li>Personalizar el contenido según tus preferencias</li>
                <li>Proteger contra fraude y abuso</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">4. Compartir tu Información</h2>
              <p className="text-[var(--text2)] mb-4">
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Con proveedores de servicios que nos ayudan a operar el sitio</li>
                <li>Cuando sea necesario para cumplir con la ley</li>
                <li>Para proteger nuestros derechos y propiedad</li>
                <li>Con tu consentimiento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">5. Seguridad de tus Datos</h2>
              <p className="text-[var(--text2)] mb-4">
                Implementamos medidas de seguridad para proteger tu información personal:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Encriptación de datos en tránsito y en reposo</li>
                <li>Acceso restringido a información personal</li>
                <li>Actualizaciones regulares de seguridad</li>
                <li>Monitoreo continuo de actividades sospechosas</li>
              </ul>
              <p className="text-[var(--text2)]">
                Sin embargo, ningún método de transmisión por Internet es 100% seguro. No podemos garantizar la seguridad absoluta de tu información.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">6. Tus Derechos</h2>
              <p className="text-[var(--text2)] mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
                <li>Solicitar una copia de tus datos</li>
              </ul>
              <p className="text-[var(--text2)]">
                Para ejercer estos derechos, contáctanos en: latamopium@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">7. Retención de Datos</h2>
              <p className="text-[var(--text2)]">
                Retenemos tu información personal solo el tiempo necesario para los fines descritos en esta política, a menos que la ley exija un período de retención más largo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">8. Cambios a esta Política</h2>
              <p className="text-[var(--text2)]">
                Podemos actualizar esta política de privacidad periódicamente. Te notificaremos de cambios significativos publicando la nueva política en nuestro sitio y actualizando la fecha de "Última actualización".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">9. Contacto</h2>
              <p className="text-[var(--text2)] mb-4">
                Si tienes preguntas sobre esta política de privacidad o el procesamiento de tus datos personales, contáctanos:
              </p>
              <div className="bg-[var(--bg3)] p-4 rounded-lg border border-[var(--border)]">
                <p className="text-[var(--text)] mb-2">
                  <strong>Email:</strong> latamopium@gmail.com
                </p>
                <p className="text-[var(--text)] mb-2">
                  <strong>Sitio Web:</strong> https://opiumlatam.com
                </p>
                <p className="text-[var(--text)]">
                  <strong>Ubicación:</strong> Latinoamérica
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">10. Cumplimiento Legal</h2>
              <p className="text-[var(--text2)]">
                Esta política de privacidad cumple con:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] space-y-2">
                <li>Reglamento General de Protección de Datos (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Leyes de protección de datos de Latinoamérica</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}