// import AppFooter from '@/components/footer/app.footer';
// import AppHeader from '@/components/header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { TrackContextProvider } from '@/lib/track.wrapper';
import { ToastProvider } from '@/utils/toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <ToastProvider>
              {/* <AppHeader /> */}
              <TrackContextProvider>
                {children}
              </TrackContextProvider>
              {/* <AppFooter /> */}
            </ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
