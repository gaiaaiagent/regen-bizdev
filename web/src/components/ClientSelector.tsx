import { Link } from 'react-router';
import { ArrowRight, TreePine, Landmark } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

const clients = [
  {
    name: 'Renew / RePlanet',
    slug: '/renew',
    icon: TreePine,
    tagline: 'Biodiversity credits ready to register, carbon stacking with existing Verra',
    score: '2 classes matched',
    scoreColor: 'text-green-600',
    details: [
      'Landscape-scale ecological restoration',
      'Conservation-weighted biodiversity scoring',
      'Carbon + biodiversity credit stacking',
    ],
  },
  {
    name: 'Landbanking Group',
    slug: '/landbanking',
    icon: Landmark,
    tagline: 'Carbon registration immediate, 4 additional dimensions on a phased pathway',
    score: '1 class matched',
    scoreColor: 'text-green-600',
    details: [
      'West African cocoa agroforestry',
      '5-dimension composite scoring (carbon, biodiversity, soil, water, social)',
      'Institutional backing (Hoffmann, Prince of Liechtenstein)',
    ],
  },
];

export function ClientSelector() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {clients.map((client) => {
        const Icon = client.icon;
        return (
          <Link key={client.slug} to={client.slug} className="group">
            <Card className="h-full transition-all group-hover:border-primary/40 group-hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${client.scoreColor}`}>{client.score}</div>
                  </div>
                </div>
                <CardDescription className="mt-2">{client.tagline}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {client.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                  View Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
