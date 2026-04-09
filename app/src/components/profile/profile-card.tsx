import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProfileCardProps {
  user: {
    name: string
    email: string
    avatarUrl?: string
    role?: string
  }
  onLogout?: () => void
}

export function ProfileCard({ user }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="w-full bg-gray-200 max-w-sm shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <div className="h-10 w-10 rounded-full text-base bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-base">{user.name}</CardTitle>
          {user.role && (
            <span className="text-xs text-muted-foreground">
              {user.role}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Member since {new Date().getFullYear()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}