import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Compass, Tag, Home, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Experiencias",
      value: "24",
      icon: Compass,
      trend: "+5% vs mes anterior",
    },
    {
      title: "Ofertas Activas",
      value: "12",
      icon: Tag,
      trend: "+2% vs mes anterior",
    },
    {
      title: "Alquileres",
      value: "18",
      icon: Home,
      trend: "+8% vs mes anterior",
    },
    {
      title: "Usuarios Registrados",
      value: "156",
      icon: Users,
      trend: "+12% vs mes anterior",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
