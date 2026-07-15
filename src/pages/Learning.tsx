import React from 'react';
import { PlayCircle, Trophy, Target, Flame, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const Learning = () => {
  const chartData = [
    { name: 'Completed', value: 3 },
    { name: 'In Progress', value: 2 },
    { name: 'Not Started', value: 5 },
  ];
  const COLORS = ['#10b981', '#f59e0b', '#e5e7eb'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Dashboard</h1>
      
      {/* Top Widgets */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Flame className="h-10 w-10 text-orange-500 mb-2" />
            <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">12 Days</div>
            <p className="text-sm font-medium text-orange-600/80">Learning Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Target className="h-10 w-10 text-blue-500 mb-2" />
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">4 / 5</div>
            <p className="text-sm font-medium text-blue-600/80">Weekly Goals Met</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 md:col-span-2">
          <CardContent className="pt-6 flex items-center justify-between h-full">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">Overall Progress</h3>
              <p className="text-sm text-purple-700/80 mb-4">You are on track to become job ready in 3 months!</p>
              <Progress value={35} className="h-2 bg-purple-200" />
            </div>
            <div className="w-32 h-32 hidden sm:block">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="h-32 bg-muted flex items-center justify-center text-5xl">
              {course.thumbnail}
            </div>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                {course.progress === 100 && <Award className="h-5 w-5 text-yellow-500 shrink-0" />}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-4 mb-4">
                <span>{course.duration}</span>
                <span className="capitalize">{course.difficulty}</span>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1">
                  <span>{course.progress}% Completed</span>
                </div>
                <Progress value={course.progress} className="h-2 mb-4" />
                <Button className="w-full" variant={course.progress === 100 ? 'outline' : 'default'}>
                  {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  {course.progress < 100 && <PlayCircle className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
