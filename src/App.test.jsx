import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import {describe,it,expect,afterEach,vi} from 'vitest';
afterEach(()=>{cleanup();vi.restoreAllMocks();localStorage.clear()});
window.scrollTo=vi.fn();
import App from './App';
describe('Arc study app',()=>{
 it('renders when browser storage is blocked',()=>{vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new DOMException('Storage denied','SecurityError')});render(<App/>);expect(screen.getByText(/Architect with clarity/i)).toBeInTheDocument()});
 it('recovers from malformed saved progress',()=>{localStorage.setItem('arc-progress','{}');render(<App/>);expect(screen.getByText(/Architect with clarity/i)).toBeInTheDocument()});
 it('renders the study dashboard',()=>{render(<App/>);expect(screen.getByText(/Architect with clarity/i)).toBeInTheDocument();expect(screen.getByText('52')).toBeInTheDocument()});
 it('opens the searchable question bank',async()=>{render(<App/>);fireEvent.click(screen.getByRole('button',{name:'Question bank'}));expect(await screen.findByLabelText('Search questions')).toBeInTheDocument();expect(screen.getByText(/A support agent must issue refunds/i)).toBeInTheDocument()});
 it('starts a mock exam',async()=>{render(<App/>);fireEvent.click(screen.getByRole('button',{name:/Mock exam/i}));fireEvent.click(await screen.findByRole('button',{name:/Begin mock exam/i}));expect(await screen.findByText('1 / 30')).toBeInTheDocument()});
});
