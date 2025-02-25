import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740484995759 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      INSERT INTO public.project (id, name, description, created_at, updated_at) VALUES
      (1, 'Project #1', 'This is a very big and important project!', '2025-02-25 06:50:25.198198', '2025-02-25 06:50:25.198198'),
      (2, 'Project #2', 'This project is slightly less important.', '2025-02-25 06:50:43.039287', '2025-02-25 06:50:43.039287');
    `);

		await queryRunner.query(`
      INSERT INTO public."user" (id, first_name, last_name, email, location) VALUES
      (1, 'Gjon', 'Hajdari', 'gjonhajdari@gmail.com', 'Prishtine, Kosovo'),
      (2, 'Desara', 'Qerimi', 'desara@gmail.com', 'Prishtine, Kosovo'),
      (3, 'Endi', 'Salihu', 'endi@gmail.com', 'Prishtine, Kosovo');
	  `);

		await queryRunner.query(`
      INSERT INTO public.task (id, name, description, status, created_at, updated_at, "projectId", "userId") VALUES
      (1, 'Fix navbar', 'Fix navigation mobile layout bar on about page', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (2, 'Update landing page', 'Redesign the hero section with a new background', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (3, 'Optimize database queries', 'Improve performance of slow SQL queries', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (4, 'Fix login bug', 'Resolve issue where users cannot log in after reset', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (5, 'Add dark mode', 'Implement dark mode toggle for UI', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (6, 'Refactor API endpoints', 'Clean up and optimize API response times', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (7, 'Write unit tests', 'Increase test coverage for critical functions', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (8, 'Update dependencies', 'Upgrade project dependencies to latest versions', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (9, 'Fix footer alignment', 'Adjust the footer to align properly on mobile', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (10, 'Create documentation', 'Write API documentation for developers', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (11, 'Design new logo', 'Create a new company logo for branding', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (12, 'Implement authentication', 'Add JWT-based authentication system', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (13, 'Fix search bar', 'Resolve issues with search results not updating', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (14, 'Optimize images', 'Compress images to improve load time', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (15, 'Improve SEO', 'Optimize meta tags and improve page speed', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (16, 'Create admin panel', 'Develop an admin dashboard for user management', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (17, 'Fix checkout errors', 'Resolve payment gateway timeout issue', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (18, 'Update user profiles', 'Allow users to add profile pictures', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (19, 'Fix CSS grid', 'Resolve misalignment in grid layout', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (20, 'Add notifications', 'Implement push notifications for updates', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (21, 'Optimize caching', 'Improve caching for faster load times', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (22, 'Improve error handling', 'Handle API errors gracefully', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (23, 'Fix sidebar collapse', 'Resolve issues with sidebar toggle', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (24, 'Update contact form', 'Improve validation and success messages', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (25, 'Fix 404 page', 'Design a better user-friendly error page', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1),
      (26, 'Implement file uploads', 'Allow users to upload profile pictures', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 2),
      (27, 'Improve mobile UX', 'Enhance UI for better usability on mobile', 'DOING', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 2),
      (28, 'Fix dashboard stats', 'Resolve incorrect calculations in reports', 'DONE', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 2, 1),
      (29, 'Implement role-based access', 'Restrict features based on user roles', 'TODO', '2025-02-25 11:51:18.510408', '2025-02-25 11:51:18.510408', 1, 1);
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM public."task"`);
		await queryRunner.query(`DELETE FROM public."user"`);
		await queryRunner.query(`DELETE FROM public."project"`);
	}
}
