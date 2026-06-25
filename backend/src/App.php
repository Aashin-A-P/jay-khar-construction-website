<?php

declare(strict_types=1);

final class App
{
    public function handle(): void
    {
        $this->cors();

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            Response::json(['message' => 'OK']);
        }

        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
            $path = preg_replace('#^/api#', '', $path) ?: '/';
            $segments = array_values(array_filter(explode('/', trim($path, '/'))));

            if ($method === 'POST' && $path === '/visits') {
                Response::json(['message' => 'Visit noted.']);
            }
            if ($method === 'GET' && $path === '/projects') {
                Response::json($this->projects());
            }
            if ($method === 'GET' && count($segments) === 2 && $segments[0] === 'projects') {
                Response::json($this->project($segments[1]));
            }
            if ($method === 'POST' && $path === '/contact') {
                $this->contact();
            }
            if ($method === 'POST' && $path === '/careers') {
                $this->careers();
            }

            Response::json(['message' => 'Endpoint not found.'], 404);
        } catch (Throwable $exception) {
            $status = Config::get('APP_ENV') === 'local' ? 500 : 500;
            Response::json(['message' => $exception->getMessage()], $status);
        }
    }

    private function cors(): void
    {
        header('Access-Control-Allow-Origin: ' . Config::get('FRONTEND_URL'));
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    private function body(): array
    {
        return json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
    }

    private function projects(): array
    {
        return $this->staticProjects();
    }

    private function project(string $slug): array
    {
        foreach ($this->staticProjects() as $project) {
            if ($project['slug'] === $slug || (string) $project['id'] === $slug) {
                return $project;
            }
        }
        Response::json(['message' => 'Project not found.'], 404);
    }

    private function staticProjects(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Modern Residence at Marthandam',
                'slug' => 'modern-residence-marthandam',
                'category' => 'Residential',
                'location' => 'Marthandam',
                'project_year' => 2025,
                'short_description' => 'A contemporary family residence planned for comfort, ventilation, and long-term value.',
                'description' => 'A complete residential construction project shaped around the client family lifestyle, with careful attention to space planning, structure, natural light, and finish quality.',
                'featured' => true,
                'status' => 'published',
                'images' => [['id' => 1, 'image_path' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 'alt_text' => 'Modern residence', 'sort_order' => 0]],
            ],
            [
                'id' => 2,
                'title' => 'Community Auditorium',
                'slug' => 'community-auditorium',
                'category' => 'Commercial',
                'location' => 'Kanyakumari District',
                'project_year' => 2024,
                'short_description' => 'A durable public-use structure designed for gatherings and community events.',
                'description' => 'This project focuses on practical circulation, robust structural planning, and a clean architectural expression suitable for high-usage community functions.',
                'featured' => true,
                'status' => 'published',
                'images' => [['id' => 2, 'image_path' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'alt_text' => 'Commercial building', 'sort_order' => 0]],
            ],
            [
                'id' => 3,
                'title' => 'Church Renovation and Extension',
                'slug' => 'church-renovation-extension',
                'category' => 'Institutional',
                'location' => 'Tamil Nadu',
                'project_year' => 2023,
                'short_description' => 'Renovation and extension work combining existing character with stronger facilities.',
                'description' => 'The scope included planning, supervision, and execution support to improve usability while respecting the identity of the existing structure.',
                'featured' => false,
                'status' => 'published',
                'images' => [['id' => 3, 'image_path' => 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80', 'alt_text' => 'Institutional project', 'sort_order' => 0]],
            ],
        ];
    }

    private function contact(): void
    {
        $data = $this->body();
        Validator::require($data, ['name', 'email', 'subject', 'message']);
        Validator::email((string) $data['email']);

        Mailer::notify('New Contact Enquiry', [
            'Name' => $data['name'],
            'Email' => $data['email'],
            'Phone' => $data['phone'] ?? '',
            'Project Type' => $data['project_type'] ?? '',
            'Approximate Budget' => $data['budget'] ?? '',
            'Subject' => $data['subject'],
            'Message' => $data['message'],
        ], 'A visitor submitted a new project enquiry through the website contact form.');
        Response::json(['message' => 'Message received.'], 201);
    }

    private function careers(): void
    {
        $data = $this->body();
        Validator::require($data, ['name', 'phone', 'email']);
        Validator::email((string) $data['email']);

        Mailer::notify('New Career Application', [
            'Name' => $data['name'],
            'Phone' => $data['phone'],
            'Email' => $data['email'],
            'Preferred Area' => $data['preferred_area'] ?? '',
            'Education' => $data['education'] ?? '',
            'Experience' => $data['experience_years'] ?? '',
            'Address' => $data['address'] ?? '',
            'Message' => $data['message'] ?? '',
        ], 'A candidate submitted a new career application through the website careers form.');
        Response::json(['message' => 'Application received.'], 201);
    }

}
