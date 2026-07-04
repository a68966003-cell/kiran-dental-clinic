import 'https://cdn.tailwindcss.com'; // Tailwind CSS ke liye

export const metadata = {
  title: 'Kiran Dental Clinic',
  description: 'Dr. Prabhat Kawale - Multispeciality Dental Clinic',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script src="https://cdn.tailwindcss.com"></script>
        {children}
      </body>
    </html>
  )
}
