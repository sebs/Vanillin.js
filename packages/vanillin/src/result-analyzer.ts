import { Program, EmitResult, Diagnostic, SourceFile, CompilerOptions, DiagnosticCategory, formatDiagnosticsWithColorAndContext, sys } from 'typescript';
import  { CompilerResult } from './compiler';

export interface DiagResult {
    hasErrors: boolean;
    hasWarnings: boolean;
    errors: Diagnostic[];
    warnings: Diagnostic[];
    formatted: string;
}

export class ResultAnalyzer {
    private program: Program;
    private emitResult: EmitResult;
    public readonly diagnostics: readonly Diagnostic[];
    public readonly preEmitDiagnostics: readonly Diagnostic[];

    constructor(result: CompilerResult) {
        const { program, emitResult, diagnostics, preEmitDiagnostics } = result;
        this.program = program;
        this.emitResult = emitResult;
        this.diagnostics = diagnostics;
        this.preEmitDiagnostics = preEmitDiagnostics;
    }

    get compilerOptions(): CompilerOptions {
        return this.program.getCompilerOptions();
    }

    get sourceFiles(): readonly SourceFile[] {
        return this.program.getSourceFiles();
    }

    get outputFiles(): string[] {
        if (!this.emitResult.emittedFiles) {
            return [];
        }
        return this.emitResult.emittedFiles;
    }

    diag(): DiagResult {
        const diagnostics = this.preEmitDiagnostics;
        const hasErrors = diagnostics.some(d => d.category === DiagnosticCategory.Error);
        const hasWarnings = diagnostics.some(d => d.category === DiagnosticCategory.Warning);
        const errors = diagnostics.filter(d => d.category === DiagnosticCategory.Error);
        const warnings = diagnostics.filter(d => d.category === DiagnosticCategory.Warning);
        const formatted = formatDiagnosticsWithColorAndContext(diagnostics, {
            getCurrentDirectory: () => process.cwd(),
            getCanonicalFileName: fileName => fileName,
            getNewLine: () => sys.newLine
        });

        return {
            hasErrors,
            hasWarnings,
            errors,
            warnings,
            formatted
        }
    }
}
